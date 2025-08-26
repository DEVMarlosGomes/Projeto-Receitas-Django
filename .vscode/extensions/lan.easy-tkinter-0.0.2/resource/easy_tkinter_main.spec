# -*- mode: python ; coding: utf-8 -*-
import os

def add_files_to_datas(base_dir, target_dir):
    datas = []
    for root, _, files in os.walk(base_dir):
        if '__pycache__' in root:
            continue
        
        for file in files:
            src_file = os.path.join(root, file)
            dest_file = os.path.relpath(os.path.join(root), base_dir)
            datas.append((src_file, os.path.join(target_dir, dest_file)))
    return datas

def gen_datas(folders):
    datas = []
    for folder in folders:
        datas += add_files_to_datas(folder, folder)
    return datas

# add folder need package here / 在这里添加需要打包的文件夹
folders = [
    'images',
]

datas_add = gen_datas(folders)


a = Analysis(
    ['easy_tkinter_main.py'], # entry point / 入口文件
    pathex=[],
    binaries=[],
    datas=[] + datas_add, # 
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='test tkinter', # output name / 输出名称
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    icon='images/icon.ico', # icon path / 图标路径
)