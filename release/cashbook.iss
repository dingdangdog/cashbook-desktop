; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "cashbook"
#define MyAppVersion "1.0.1"
#define MyAppPublisher "dingdangdog"
#define MyAppURL "https://www.oldmoon.top/"
#define MyAppExeName "cashbook.exe"
#define MyAppAssocName MyAppName + " File"
#define MyAppAssocExt ".myp"
#define MyAppAssocKey StringChange(MyAppAssocName, " ", "") + MyAppAssocExt

[Setup]
; NOTE: The value of AppId uniquely identifies this application. Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{CA2F3B00-F2DD-4B57-827B-24B15287807F}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
ChangesAssociations=yes
DisableProgramGroupPage=yes
; Uncomment the following line to run in non administrative install mode (install for current user only.)
;PrivilegesRequired=lowest
OutputDir=E:\codes\dingdangdog\my-product\cashbook-desktop\release
OutputBaseFilename=cashbook-v1.0.1-win-x86
SetupIconFile=E:\codes\dingdangdog\my-product\cashbook-desktop\release\icon.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\{#MyAppExeName}"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\chrome_100_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\chrome_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\d3dcompiler_47.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\ffmpeg.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\icudtl.dat"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\libEGL.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\libGLESv2.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\LICENSE.electron.txt"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\LICENSES.chromium.html"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\resources.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\snapshot_blob.bin"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\v8_context_snapshot.bin"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\vk_swiftshader.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\vk_swiftshader_icd.json"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\vulkan-1.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\resources\*"; DestDir: "{app}\resources"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "E:\codes\dingdangdog\my-product\cashbook-desktop\release\build\win-unpacked\locales\*"; DestDir: "{app}\locales"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Registry]
Root: HKA; Subkey: "Software\Classes\{#MyAppAssocExt}\OpenWithProgids"; ValueType: string; ValueName: "{#MyAppAssocKey}"; ValueData: ""; Flags: uninsdeletevalue
Root: HKA; Subkey: "Software\Classes\{#MyAppAssocKey}"; ValueType: string; ValueName: ""; ValueData: "{#MyAppAssocName}"; Flags: uninsdeletekey
Root: HKA; Subkey: "Software\Classes\{#MyAppAssocKey}\DefaultIcon"; ValueType: string; ValueName: ""; ValueData: "{app}\{#MyAppExeName},0"
Root: HKA; Subkey: "Software\Classes\{#MyAppAssocKey}\shell\open\command"; ValueType: string; ValueName: ""; ValueData: """{app}\{#MyAppExeName}"" ""%1"""
Root: HKA; Subkey: "Software\Classes\Applications\{#MyAppExeName}\SupportedTypes"; ValueType: string; ValueName: ".myp"; ValueData: ""

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

