from tkinter import *
import socket
import time

def alarma():
    s=socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
    s.bind(('',5000))
    data, addr= s.recvfrom(1024)
    data=int(data.decode())
    if(data==0):
        foto1=PhotoImage(file="Image-Py/Ter1.png")
        btn_causas.image = foto1
        btn_causas.config(image=foto1)
        btn_causas.place(x=5,y=25)
    if(data>=900 and data<=927):
        foto1=PhotoImage(file="Image-Py/Ter1.png")
        btn_causas.image = foto1
        btn_causas.config(image=foto1)
        btn_causas.place(x=5,y=25)
    if(data>927 and data<=954):
        foto2=PhotoImage(file="Image-Py/Ter2.png")
        btn_causas.image = foto2
        btn_causas.config(image=foto2)
        btn_causas.place(x=5,y=25)
    if(data>954 and data<=981):
        foto3=PhotoImage(file="Image-Py/Ter3.png")
        btn_causas.image = foto3
        btn_causas.config(image=foto3)
        btn_causas.place(x=5,y=25)
    if(data>981 and data<=1008):
        foto4=PhotoImage(file="Image-Py/Ter4.png")
        btn_causas.image = foto4
        btn_causas.config(image=foto4)
        btn_causas.place(x=5,y=25)
    if(data>1008 and data<=1035):
        foto5=PhotoImage(file="Image-Py/Ter5.png")
        btn_causas.image = foto5
        btn_causas.config(image=foto5)
        btn_causas.place(x=5,y=25)
    if(data>1035 and data<=1062):
        foto6=PhotoImage(file="Image-Py/Ter6.png")
        btn_causas.image = foto6
        btn_causas.config(image=foto6)
        btn_causas.place(x=5,y=25)
    if(data>1062 and data<=1089):
        foto7=PhotoImage(file="Image-Py/Ter7.png")
        btn_causas.image = foto7
        btn_causas.config(image=foto7)
        btn_causas.place(x=5,y=25)
    if(data>1089 and data<=1116):
        foto8=PhotoImage(file="Image-Py/Ter8.png")
        btn_causas.image = foto8
        btn_causas.config(image=foto8)
        btn_causas.place(x=5,y=25)
    if(data>1116 and data<=1143):
        foto9=PhotoImage(file="Image-Py/Ter9.png")
        btn_causas.image = foto9
        btn_causas.config(image=foto9)
        btn_causas.place(x=5,y=25)
    if(data>1143 and data<=1170):
        foto10=PhotoImage(file="Image-Py/Ter10.png")
        btn_causas.image = foto10
        btn_causas.config(image=foto10)
        btn_causas.place(x=5,y=25)
    if(data>1170 and data<=1200):
        foto11=PhotoImage(file="Image-Py/Ter11.png")
        btn_causas.image = foto11
        btn_causas.config(image=foto11)
        btn_causas.place(x=5,y=25)
    v.after(50,alarma)
    
v= Tk()
v.title("Alarma")
v.geometry("150x320+960+150")
v.resizable(width=False,height=False)
v.iconbitmap("Image-Py/icono.ico")
v.wm_attributes("-topmost", True)
L=Label(v,text="Sistema de Alarma")
L.pack()
foto1=PhotoImage(file="Image-Py/Ter1.png")
btn_causas=Button(v,image=foto1, bg="white",width=100,height=280, font=('Helvetica',12),compound=LEFT)
btn_causas.pack()
v.after(50,alarma)
v.mainloop()
