[Version]
Signature="$WINDOWS NT$"
Class=Mouse
ClassGuid={4D36E96F-E325-11CE-BFC1-08002BE10318}
Provider=%ManufacturerName%
DriverVer=07/10/2025,19.27.49.735
CatalogFile=Mouse32.cat
PnpLockdown=1

[Manufacturer]
%ManufacturerName%=Standard,NTx86

[Standard.NTx86]
%DeviceName%=MouseFilter_Inst, *PNP0F13  ; chuột PS/2 & HID chuột thông dụng

[MouseFilter_Inst]
CopyFiles=DriverCopy

[MouseFilter_Inst.Services]
AddService=Mouse32, 0x00000002, Mouse32_Service_Inst
AddReg=MouseFilter_AddReg

[Mouse32_Service_Inst]
DisplayName    = %DeviceName%
ServiceType    = 1
StartType      = 3
ErrorControl   = 1
ServiceBinary  = %12%\\Mouse32.sys

[MouseFilter_AddReg]
HKR,,"UpperFilters",0x00010000,"Mouse32"

[DriverCopy]
Mouse32.sys

[DestinationDirs]
DriverCopy=12

[SourceDisksFiles]
Mouse32.sys=1

[SourceDisksNames]
1=%DiskName%,,,

[Strings]
ManufacturerName="YourCompany"
DeviceName="Mouse Filter Driver"
DiskName="Mouse32 Install Disk"
