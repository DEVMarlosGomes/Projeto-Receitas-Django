

import os
import subprocess

DIR_ROOT = os.getcwd()
# 切换
d_drive_path = DIR_ROOT 
os.chdir(d_drive_path)

# 打印当前工作目录确认已经切换
# print(f"Current working directory: {os.getcwd()}")

# 定义要执行的命令
command = "\"C:\\Users\\Administrator\\AppData\\Roaming\\npm\\vsce.cmd\" package"  # 例如，使用Windows命令 `dir`

# 执行命令
try:
    result = subprocess.run(command, check=True, text=True, capture_output=True, encoding='utf-8')
    print("Command output:")
    print(result.stdout)
except subprocess.CalledProcessError as e:
    print(f"Error executing command: {e}")
    print(f"Command output (stderr): {e.stderr}")