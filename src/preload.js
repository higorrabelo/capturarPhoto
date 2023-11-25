const { contextBridge,ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('actions',{
    exit : ()=>ipcRenderer.invoke('exit'),
    minimize:()=>ipcRenderer.invoke('minimize'),
    maximize:()=>ipcRenderer.invoke('maximize'),
    openPhoto:()=>ipcRenderer.invoke('openPhoto'),
    capture:(data)=>ipcRenderer.invoke('capture',data),
})