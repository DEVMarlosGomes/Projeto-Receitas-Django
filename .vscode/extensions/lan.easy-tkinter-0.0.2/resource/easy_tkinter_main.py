from typing import *
import tkinter as tk
import customtkinter as ctk
from customtkinter import CTkScrollbar
import tkinter.ttk as ttk  # 导入 ttk 模块
import time
import os, shutil, sys, zipfile, subprocess, re, json

# inside path / 内部路径
DIR_IN = os.path.dirname(os.path.abspath(__file__))
# outside path / 外部路径
DIR_OUT = os.getcwd()

def gen_dir_in(*path: str) -> str:
    return os.path.join(DIR_IN, *path)

def gen_dir_out(*path: str) -> str:
    return os.path.join(DIR_OUT, *path)

class Main:
    def __init__(self, root):
        self.root = root
        self.root.title("test tkinter")
        self.w = 700
        self.h = 400
        self.root.geometry(f"{self.w}x{self.h}+100+100")
        self.root.resizable(False, False)
        self.create_widgets()
        self.root.mainloop()

    def create_widgets(self):
        status_textbox_w,status_textbox_h = 200, 400
        # Create Status Title / 创建标题标签 
        self.status_title = ctk.CTkButton(self.root, width=status_textbox_w+18, height=25,text='status: ', command='')
        self.status_title.place(x=0, y=0)
        self.status_title.configure(state="disabled",fg_color='#ab731b',text_color_disabled='white')
        
        # Create Status Textbox / 创建文本框
        self.status_textbox = ctk.CTkTextbox(self.root, height=status_textbox_h, width=status_textbox_w, state="disabled")
        self.status_textbox.place(x=0, y=25)
        
        # Create Scrollbar / 添加滚动条
        # scrollbar = ttk.Scrollbar(self.root, orient="vertical", command=self.status_textbox.yview)
        # scrollbar.place(x=status_textbox_w, y=25, height=status_textbox_h)
        # self.status_textbox.configure(yscrollcommand=scrollbar.set)
        # Create Scrollbar / 添加滚动条
        scrollbar = CTkScrollbar(
            self.root,
            orientation="vertical",
            command=self.status_textbox.yview,
            width=16,
            height=status_textbox_h
        )
        scrollbar.place(x=status_textbox_w, y=25)

        self.status_textbox.configure(yscrollcommand=scrollbar.set)

        # Set initial status / 设置初始状态
        self.set_status('hello world')
        

    def set_status(self, text: str):
        self.status_textbox.configure(state="normal")  # Enable textbox
        self.status_textbox.delete(1.0, tk.END)         # delete existing text
        self.status_textbox.insert(tk.END, 'Status: ' + text)  # Insert text
        self.status_textbox.configure(state="disabled")  # Disable textbox
    
    # debug: print in status bar / 在状态栏打印
    def printin(self, text: str):
        self.set_status(text)

    

# init
ctk.set_appearance_mode('Dark')
ctk.set_default_color_theme('blue')

# main window
root = ctk.CTk()
root.iconbitmap(gen_dir_in('images','icon.ico'))
app = Main(root)