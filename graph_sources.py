"""Exhaustive connected-graph sources for finite invariant experiments."""

from collections.abc import Iterator
from pathlib import Path
import os
import shutil
import subprocess
from dataclasses import dataclass

import networkx as nx


KNOWN_GENG_PATHS: tuple[str, ...] = ()


@dataclass(frozen=True)
class GengBackend:
    executable: str
    backend: str
    msys2_root: str | None = None
    bash: str | None = None


def _valid_executable(path: str | None) -> str | None:
    """Return an existing executable path, if supplied."""
    if path and Path(path).is_file():
        return str(Path(path))
    return None


def detect_geng(executable_path: str | None = None) -> str | None:
    """Return a usable nauty/Traces ``geng`` executable without downloading one."""
    explicit = _valid_executable(executable_path)
    if explicit:
        return explicit
    configured = _valid_executable(os.environ.get("INVARIANT_TWINS_GENG"))
    if configured:
        return configured
    # Ubuntu's nauty package commonly installs the executable as nauty-geng.
    for name in ("geng", "geng.exe", "nauty-geng"):
        found = shutil.which(name)
        if found:
            return found
    for known_path in KNOWN_GENG_PATHS:
        known = _valid_executable(known_path)
        if known:
            return known
    return None


def derive_msys2_root(executable: str) -> str | None:
    """Derive an MSYS2 root from ``<root>/ucrt64/bin/geng.exe``."""
    path = Path(executable).resolve()
    if path.parent.name.lower() == "bin" and path.parent.parent.name.lower() == "ucrt64":
        return str(path.parent.parent.parent)
    return None


def resolve_geng_backend(executable_path: str | None = None) -> GengBackend | None:
    """Describe the preferred backend; native is tried first, then MSYS2 fallback."""
    executable = detect_geng(executable_path)
    if executable is None:
        return None
    root = derive_msys2_root(executable)
    bash = str(Path(root) / "usr" / "bin" / "bash.exe") if root else None
    return GengBackend(executable, "native", root, bash if bash and Path(bash).is_file() else None)


def _start_geng(backend: GengBackend, order: int, use_msys2: bool) -> subprocess.Popen[str]:
    environment = os.environ.copy()
    environment["PATH"] = str(Path(backend.executable).parent) + os.pathsep + environment.get("PATH", "")
    if use_msys2:
        environment.update({"MSYSTEM": "UCRT64", "CHERE_INVOKING": "yes", "HOME": environment.get("HOME", "/tmp")})
        command = [backend.bash, "-lc", f"/ucrt64/bin/geng -cq {order}"]
    else:
        command = [backend.executable, "-cq", str(order)]
    return subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, env=environment)


def iter_atlas_connected_graphs(order: int) -> Iterator[nx.Graph]:
    """Yield the exhaustive connected Graph Atlas collection for one order (<= 7)."""
    if not 1 <= order <= 7:
        return
    for graph in nx.graph_atlas_g():
        if graph.number_of_nodes() == order and nx.is_connected(graph):
            yield nx.Graph(graph)


def iter_geng_connected_graphs(order: int, executable_path: str | None = None) -> Iterator[nx.Graph]:
    """Stream connected order-``n`` graphs emitted by ``geng -c n`` as graph6."""
    backend = resolve_geng_backend(executable_path)
    if backend is None:
        raise FileNotFoundError("nauty/Traces geng was not found")
    for use_msys2 in (False, True):
        if use_msys2 and not backend.bash:
            break
        process = _start_geng(backend, order, use_msys2)
        assert process.stdout is not None
        emitted = False
        for line in process.stdout:
            text = line.strip()
            if not text:
                continue
            try:
                emitted = True
                yield nx.from_graph6_bytes(text.encode())
            except nx.NetworkXError:
                continue
        process.stdout.close()
        return_code = process.wait()
        stderr = process.stderr.read() if process.stderr else ""
        if return_code == 0:
            return
        if use_msys2 or emitted:
            raise RuntimeError(stderr.strip() or f"geng {backend.backend} execution exited with status {return_code}")
    raise RuntimeError("geng native execution failed and no usable MSYS2 UCRT64 bash fallback was found")


def iter_connected_graphs(order: int, executable_path: str | None = None) -> Iterator[nx.Graph]:
    """Use the Graph Atlas through 7 vertices and geng for larger orders."""
    if order <= 7:
        yield from iter_atlas_connected_graphs(order)
    else:
        yield from iter_geng_connected_graphs(order, executable_path)
