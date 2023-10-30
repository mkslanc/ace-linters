"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6700],{

/***/ 12764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);

var FoldMode = exports.Z = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    
    //prevent naming conflict with any modes that inherit from cstyle and override this (like csharp)
    this._getFoldWidgetBase = this.getFoldWidget;
    
    /**
     * Gets fold widget with some non-standard extras:
     *
     * @example lineCommentRegionStart
     *      //#region [optional description]
     *
     * @example blockCommentRegionStart
     *      /*#region [optional description] *[/]
     *
     * @example tripleStarFoldingSection
     *      /*** this folds even though 1 line because it has 3 stars ***[/]
     * 
     * @note the pound symbol for region tags is optional
     */
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            // No widget for single line block comment unless region or triple star
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    
    /**
     * gets comment region block with end region assumed to be start of comment in any cstyle mode or SQL mode (--) which inherits from this.
     * There may optionally be a pound symbol before the region/endregion statement
     */
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 1164:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(59082)/* .Range */ .e);

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;


/***/ }),

/***/ 36700:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var PowershellHighlightRules = (__webpack_require__(62402)/* .PowershellHighlightRules */ .S);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = PowershellHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
    this.foldingRules = new CStyleFoldMode({start: "^\\s*(<#)", end: "^[#\\s]>\\s*$"});
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "#";
    this.blockComment = {start: "<#", end: "#>"};
    
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }
      
        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };


    this.createWorker = function(session) {
        return null;
    };

    this.$id = "ace/mode/powershell";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 62402:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var PowershellHighlightRules = function() {

    // Help Reference: about_Language_Keywords
    // https://technet.microsoft.com/en-us/library/hh847744.aspx
    var keywords = (
        "begin|break|catch|continue|data|do|dynamicparam|else|elseif|end|exit|filter|" +
        "finally|for|foreach|from|function|if|in|inlinescript|hidden|parallel|param|" +
        "process|return|sequence|switch|throw|trap|try|until|while|workflow"
    );

    // Command to enumerate all module commands in Windows PowerShell:
    // PS C:\> Get-Module -ListAvailable | Select-Object -Unique Name -ExpandProperty Name | Sort-Object |
    //             ForEach-Object { "// Module $_"; '"' + ((Get-Command -Module $_ | Select-Object -ExpandProperty Name) -join '|') + '|" +' } | clip
    var builtinFunctions = (
        // Module AppBackgroundTask
        "Get-AppBackgroundTask|Start-AppBackgroundTask|Unregister-AppBackgroundTask|Disable-AppBackgroundTaskDiagnosticLog|Enable-AppBackgroundTaskDiagnosticLog|Set-AppBackgroundTaskResourcePolicy|" +
        // Module AppLocker
        "Get-AppLockerFileInformation|Get-AppLockerPolicy|New-AppLockerPolicy|Set-AppLockerPolicy|Test-AppLockerPolicy|" +
        // Module Appx
        "Get-AppxLastError|Get-AppxLog|Add-AppxPackage|Add-AppxVolume|Dismount-AppxVolume|Get-AppxDefaultVolume|Get-AppxPackage|Get-AppxPackageManifest|Get-AppxVolume|Mount-AppxVolume|Move-AppxPackage|Remove-AppxPackage|Remove-AppxVolume|Set-AppxDefaultVolume|" +
        // Module AssignedAccess
        "Clear-AssignedAccess|Get-AssignedAccess|Set-AssignedAccess|" +
        // Module BitLocker
        "Add-BitLockerKeyProtector|Backup-BitLockerKeyProtector|Clear-BitLockerAutoUnlock|Disable-BitLocker|Disable-BitLockerAutoUnlock|Enable-BitLocker|Enable-BitLockerAutoUnlock|Get-BitLockerVolume|Lock-BitLocker|Remove-BitLockerKeyProtector|Resume-BitLocker|Suspend-BitLocker|Unlock-BitLocker|" +
        // Module BitsTransfer
        "Add-BitsFile|Complete-BitsTransfer|Get-BitsTransfer|Remove-BitsTransfer|Resume-BitsTransfer|Set-BitsTransfer|Start-BitsTransfer|Suspend-BitsTransfer|" +
        // Module BranchCache
        "Add-BCDataCacheExtension|Clear-BCCache|Disable-BC|Disable-BCDowngrading|Disable-BCServeOnBattery|Enable-BCDistributed|Enable-BCDowngrading|Enable-BCHostedClient|Enable-BCHostedServer|Enable-BCLocal|Enable-BCServeOnBattery|Export-BCCachePackage|Export-BCSecretKey|Get-BCClientConfiguration|Get-BCContentServerConfiguration|Get-BCDataCache|Get-BCDataCacheExtension|Get-BCHashCache|Get-BCHostedCacheServerConfiguration|Get-BCNetworkConfiguration|Get-BCStatus|Import-BCCachePackage|Import-BCSecretKey|Publish-BCFileContent|Publish-BCWebContent|Remove-BCDataCacheExtension|Reset-BC|Set-BCAuthentication|Set-BCCache|Set-BCDataCacheEntryMaxAge|Set-BCMinSMBLatency|Set-BCSecretKey|" +
        // Module CimCmdlets
        "Export-BinaryMiLog|Get-CimAssociatedInstance|Get-CimClass|Get-CimInstance|Get-CimSession|Import-BinaryMiLog|Invoke-CimMethod|New-CimInstance|New-CimSession|New-CimSessionOption|Register-CimIndicationEvent|Remove-CimInstance|Remove-CimSession|Set-CimInstance|" +
        // Module CIPolicy
        "ConvertFrom-CIPolicy|" +
        // Module ConfigCI
        "Add-SignerRule|Edit-CIPolicyRule|Get-CIPolicy|Get-CIPolicyInfo|Get-SystemDriver|Merge-CIPolicy|New-CIPolicy|New-CIPolicyRule|Remove-CIPolicyRule|Set-CIPolicyVersion|Set-HVCIOptions|Set-RuleOption|" +
        // Module Defender
        "Add-MpPreference|Get-MpComputerStatus|Get-MpPreference|Get-MpThreat|Get-MpThreatCatalog|Get-MpThreatDetection|Remove-MpPreference|Remove-MpThreat|Set-MpPreference|Start-MpScan|Start-MpWDOScan|Update-MpSignature|" +
        // Module DirectAccessClientComponents
        "Disable-DAManualEntryPointSelection|Enable-DAManualEntryPointSelection|Get-DAClientExperienceConfiguration|Get-DAEntryPointTableItem|New-DAEntryPointTableItem|Remove-DAEntryPointTableItem|Rename-DAEntryPointTableItem|Reset-DAClientExperienceConfiguration|Reset-DAEntryPointTableItem|Set-DAClientExperienceConfiguration|Set-DAEntryPointTableItem|" +
        // Module Dism
        "Add-ProvisionedAppxPackage|Apply-WindowsUnattend|Get-ProvisionedAppxPackage|Remove-ProvisionedAppxPackage|Add-AppxProvisionedPackage|Add-WindowsCapability|Add-WindowsDriver|Add-WindowsImage|Add-WindowsPackage|Clear-WindowsCorruptMountPoint|Disable-WindowsOptionalFeature|Dismount-WindowsImage|Enable-WindowsOptionalFeature|Expand-WindowsCustomDataImage|Expand-WindowsImage|Export-WindowsDriver|Export-WindowsImage|Get-AppxProvisionedPackage|Get-WIMBootEntry|Get-WindowsCapability|Get-WindowsDriver|Get-WindowsEdition|Get-WindowsImage|Get-WindowsImageContent|Get-WindowsOptionalFeature|Get-WindowsPackage|Mount-WindowsImage|New-WindowsCustomImage|New-WindowsImage|Optimize-WindowsImage|Remove-AppxProvisionedPackage|Remove-WindowsCapability|Remove-WindowsDriver|Remove-WindowsImage|Remove-WindowsPackage|Repair-WindowsImage|Save-WindowsImage|Set-AppXProvisionedDataFile|Set-WindowsEdition|Set-WindowsProductKey|Split-WindowsImage|Update-WIMBootEntry|Use-WindowsUnattend|" +
        // Module DnsClient
        "Add-DnsClientNrptRule|Clear-DnsClientCache|Get-DnsClient|Get-DnsClientCache|Get-DnsClientGlobalSetting|Get-DnsClientNrptGlobal|Get-DnsClientNrptPolicy|Get-DnsClientNrptRule|Get-DnsClientServerAddress|Register-DnsClient|Remove-DnsClientNrptRule|Set-DnsClient|Set-DnsClientGlobalSetting|Set-DnsClientNrptGlobal|Set-DnsClientNrptRule|Set-DnsClientServerAddress|Resolve-DnsName|" +
        // Module EventTracingManagement
        "Add-EtwTraceProvider|Get-AutologgerConfig|Get-EtwTraceProvider|Get-EtwTraceSession|New-AutologgerConfig|New-EtwTraceSession|Remove-AutologgerConfig|Remove-EtwTraceProvider|Remove-EtwTraceSession|Send-EtwTraceSession|Set-AutologgerConfig|Set-EtwTraceProvider|Set-EtwTraceSession|" +
        // Module International
        "Get-WinAcceptLanguageFromLanguageListOptOut|Get-WinCultureFromLanguageListOptOut|Get-WinDefaultInputMethodOverride|Get-WinHomeLocation|Get-WinLanguageBarOption|Get-WinSystemLocale|Get-WinUILanguageOverride|Get-WinUserLanguageList|New-WinUserLanguageList|Set-Culture|Set-WinAcceptLanguageFromLanguageListOptOut|Set-WinCultureFromLanguageListOptOut|Set-WinDefaultInputMethodOverride|Set-WinHomeLocation|Set-WinLanguageBarOption|Set-WinSystemLocale|Set-WinUILanguageOverride|Set-WinUserLanguageList|" +
        // Module iSCSI
        "Connect-IscsiTarget|Disconnect-IscsiTarget|Get-IscsiConnection|Get-IscsiSession|Get-IscsiTarget|Get-IscsiTargetPortal|New-IscsiTargetPortal|Register-IscsiSession|Remove-IscsiTargetPortal|Set-IscsiChapSecret|Unregister-IscsiSession|Update-IscsiTarget|Update-IscsiTargetPortal|" +
        // Module ISE
        "Get-IseSnippet|Import-IseSnippet|New-IseSnippet|" +
        // Module Kds
        "Add-KdsRootKey|Clear-KdsCache|Get-KdsConfiguration|Get-KdsRootKey|Set-KdsConfiguration|Test-KdsRootKey|" +
        // Module Microsoft.PowerShell.Archive
        "Compress-Archive|Expand-Archive|" +
        // Module Microsoft.PowerShell.Diagnostics
        "Export-Counter|Get-Counter|Get-WinEvent|Import-Counter|New-WinEvent|" +
        // Module Microsoft.PowerShell.Host
        "Start-Transcript|Stop-Transcript|" +
        // Module Microsoft.PowerShell.Management
        "Add-Computer|Add-Content|Checkpoint-Computer|Clear-Content|Clear-EventLog|Clear-Item|Clear-ItemProperty|Clear-RecycleBin|Complete-Transaction|Convert-Path|Copy-Item|Copy-ItemProperty|Debug-Process|Disable-ComputerRestore|Enable-ComputerRestore|Get-ChildItem|Get-Clipboard|Get-ComputerRestorePoint|Get-Content|Get-ControlPanelItem|Get-EventLog|Get-HotFix|Get-Item|Get-ItemProperty|Get-ItemPropertyValue|Get-Location|Get-Process|Get-PSDrive|Get-PSProvider|Get-Service|Get-Transaction|Get-WmiObject|Invoke-Item|Invoke-WmiMethod|Join-Path|Limit-EventLog|Move-Item|Move-ItemProperty|New-EventLog|New-Item|New-ItemProperty|New-PSDrive|New-Service|New-WebServiceProxy|Pop-Location|Push-Location|Register-WmiEvent|Remove-Computer|Remove-EventLog|Remove-Item|Remove-ItemProperty|Remove-PSDrive|Remove-WmiObject|Rename-Computer|Rename-Item|Rename-ItemProperty|Reset-ComputerMachinePassword|Resolve-Path|Restart-Computer|Restart-Service|Restore-Computer|Resume-Service|Set-Clipboard|Set-Content|Set-Item|Set-ItemProperty|Set-Location|Set-Service|Set-WmiInstance|Show-ControlPanelItem|Show-EventLog|Split-Path|Start-Process|Start-Service|Start-Transaction|Stop-Computer|Stop-Process|Stop-Service|Suspend-Service|Test-ComputerSecureChannel|Test-Connection|Test-Path|Undo-Transaction|Use-Transaction|Wait-Process|Write-EventLog|" +
        // Module Microsoft.PowerShell.ODataUtils
        "Export-ODataEndpointProxy|" +
        // Module Microsoft.PowerShell.Security
        "ConvertFrom-SecureString|ConvertTo-SecureString|Get-Acl|Get-AuthenticodeSignature|Get-CmsMessage|Get-Credential|Get-ExecutionPolicy|Get-PfxCertificate|Protect-CmsMessage|Set-Acl|Set-AuthenticodeSignature|Set-ExecutionPolicy|Unprotect-CmsMessage|" +
        // Module Microsoft.PowerShell.Utility
        "ConvertFrom-SddlString|Format-Hex|Get-FileHash|Import-PowerShellDataFile|New-Guid|New-TemporaryFile|Add-Member|Add-Type|Clear-Variable|Compare-Object|ConvertFrom-Csv|ConvertFrom-Json|ConvertFrom-String|ConvertFrom-StringData|Convert-String|ConvertTo-Csv|ConvertTo-Html|ConvertTo-Json|ConvertTo-Xml|Debug-Runspace|Disable-PSBreakpoint|Disable-RunspaceDebug|Enable-PSBreakpoint|Enable-RunspaceDebug|Export-Alias|Export-Clixml|Export-Csv|Export-FormatData|Export-PSSession|Format-Custom|Format-List|Format-Table|Format-Wide|Get-Alias|Get-Culture|Get-Date|Get-Event|Get-EventSubscriber|Get-FormatData|Get-Host|Get-Member|Get-PSBreakpoint|Get-PSCallStack|Get-Random|Get-Runspace|Get-RunspaceDebug|Get-TraceSource|Get-TypeData|Get-UICulture|Get-Unique|Get-Variable|Group-Object|Import-Alias|Import-Clixml|Import-Csv|Import-LocalizedData|Import-PSSession|Invoke-Expression|Invoke-RestMethod|Invoke-WebRequest|Measure-Command|Measure-Object|New-Alias|New-Event|New-Object|New-TimeSpan|New-Variable|Out-File|Out-GridView|Out-Printer|Out-String|Read-Host|Register-EngineEvent|Register-ObjectEvent|Remove-Event|Remove-PSBreakpoint|Remove-TypeData|Remove-Variable|Select-Object|Select-String|Select-Xml|Send-MailMessage|Set-Alias|Set-Date|Set-PSBreakpoint|Set-TraceSource|Set-Variable|Show-Command|Sort-Object|Start-Sleep|Tee-Object|Trace-Command|Unblock-File|Unregister-Event|Update-FormatData|Update-List|Update-TypeData|Wait-Debugger|Wait-Event|Write-Debug|Write-Error|Write-Host|Write-Information|Write-Output|Write-Progress|Write-Verbose|Write-Warning|" +
        // Module Microsoft.WSMan.Management
        "Connect-WSMan|Disable-WSManCredSSP|Disconnect-WSMan|Enable-WSManCredSSP|Get-WSManCredSSP|Get-WSManInstance|Invoke-WSManAction|New-WSManInstance|New-WSManSessionOption|Remove-WSManInstance|Set-WSManInstance|Set-WSManQuickConfig|Test-WSMan|" +
        // Module MMAgent
        "Debug-MMAppPrelaunch|Disable-MMAgent|Enable-MMAgent|Get-MMAgent|Set-MMAgent|" +
        // Module MsDtc
        "Add-DtcClusterTMMapping|Get-Dtc|Get-DtcAdvancedHostSetting|Get-DtcAdvancedSetting|Get-DtcClusterDefault|Get-DtcClusterTMMapping|Get-DtcDefault|Get-DtcLog|Get-DtcNetworkSetting|Get-DtcTransaction|Get-DtcTransactionsStatistics|Get-DtcTransactionsTraceSession|Get-DtcTransactionsTraceSetting|Install-Dtc|Remove-DtcClusterTMMapping|Reset-DtcLog|Set-DtcAdvancedHostSetting|Set-DtcAdvancedSetting|Set-DtcClusterDefault|Set-DtcClusterTMMapping|Set-DtcDefault|Set-DtcLog|Set-DtcNetworkSetting|Set-DtcTransaction|Set-DtcTransactionsTraceSession|Set-DtcTransactionsTraceSetting|Start-Dtc|Start-DtcTransactionsTraceSession|Stop-Dtc|Stop-DtcTransactionsTraceSession|Test-Dtc|Uninstall-Dtc|Write-DtcTransactionsTraceSession|Complete-DtcDiagnosticTransaction|Join-DtcDiagnosticResourceManager|New-DtcDiagnosticTransaction|Receive-DtcDiagnosticTransaction|Send-DtcDiagnosticTransaction|Start-DtcDiagnosticResourceManager|Stop-DtcDiagnosticResourceManager|Undo-DtcDiagnosticTransaction|" +
        // Module NetAdapter
        "Disable-NetAdapter|Disable-NetAdapterBinding|Disable-NetAdapterChecksumOffload|Disable-NetAdapterEncapsulatedPacketTaskOffload|Disable-NetAdapterIPsecOffload|Disable-NetAdapterLso|Disable-NetAdapterPacketDirect|Disable-NetAdapterPowerManagement|Disable-NetAdapterQos|Disable-NetAdapterRdma|Disable-NetAdapterRsc|Disable-NetAdapterRss|Disable-NetAdapterSriov|Disable-NetAdapterVmq|Enable-NetAdapter|Enable-NetAdapterBinding|Enable-NetAdapterChecksumOffload|Enable-NetAdapterEncapsulatedPacketTaskOffload|Enable-NetAdapterIPsecOffload|Enable-NetAdapterLso|Enable-NetAdapterPacketDirect|Enable-NetAdapterPowerManagement|Enable-NetAdapterQos|Enable-NetAdapterRdma|Enable-NetAdapterRsc|Enable-NetAdapterRss|Enable-NetAdapterSriov|Enable-NetAdapterVmq|Get-NetAdapter|Get-NetAdapterAdvancedProperty|Get-NetAdapterBinding|Get-NetAdapterChecksumOffload|Get-NetAdapterEncapsulatedPacketTaskOffload|Get-NetAdapterHardwareInfo|Get-NetAdapterIPsecOffload|Get-NetAdapterLso|Get-NetAdapterPacketDirect|Get-NetAdapterPowerManagement|Get-NetAdapterQos|Get-NetAdapterRdma|Get-NetAdapterRsc|Get-NetAdapterRss|Get-NetAdapterSriov|Get-NetAdapterSriovVf|Get-NetAdapterStatistics|Get-NetAdapterVmq|Get-NetAdapterVmqQueue|Get-NetAdapterVPort|New-NetAdapterAdvancedProperty|Remove-NetAdapterAdvancedProperty|Rename-NetAdapter|Reset-NetAdapterAdvancedProperty|Restart-NetAdapter|Set-NetAdapter|Set-NetAdapterAdvancedProperty|Set-NetAdapterBinding|Set-NetAdapterChecksumOffload|Set-NetAdapterEncapsulatedPacketTaskOffload|Set-NetAdapterIPsecOffload|Set-NetAdapterLso|Set-NetAdapterPacketDirect|Set-NetAdapterPowerManagement|Set-NetAdapterQos|Set-NetAdapterRdma|Set-NetAdapterRsc|Set-NetAdapterRss|Set-NetAdapterSriov|Set-NetAdapterVmq|" +
        // Module NetConnection
        "Get-NetConnectionProfile|Set-NetConnectionProfile|" +
        // Module NetEventPacketCapture
        "Add-NetEventNetworkAdapter|Add-NetEventPacketCaptureProvider|Add-NetEventProvider|Add-NetEventVmNetworkAdapter|Add-NetEventVmSwitch|Add-NetEventWFPCaptureProvider|Get-NetEventNetworkAdapter|Get-NetEventPacketCaptureProvider|Get-NetEventProvider|Get-NetEventSession|Get-NetEventVmNetworkAdapter|Get-NetEventVmSwitch|Get-NetEventWFPCaptureProvider|New-NetEventSession|Remove-NetEventNetworkAdapter|Remove-NetEventPacketCaptureProvider|Remove-NetEventProvider|Remove-NetEventSession|Remove-NetEventVmNetworkAdapter|Remove-NetEventVmSwitch|Remove-NetEventWFPCaptureProvider|Set-NetEventPacketCaptureProvider|Set-NetEventProvider|Set-NetEventSession|Set-NetEventWFPCaptureProvider|Start-NetEventSession|Stop-NetEventSession|" +
        // Module NetLbfo
        "Add-NetLbfoTeamMember|Add-NetLbfoTeamNic|Get-NetLbfoTeam|Get-NetLbfoTeamMember|Get-NetLbfoTeamNic|New-NetLbfoTeam|Remove-NetLbfoTeam|Remove-NetLbfoTeamMember|Remove-NetLbfoTeamNic|Rename-NetLbfoTeam|Set-NetLbfoTeam|Set-NetLbfoTeamMember|Set-NetLbfoTeamNic|" +
        // Module NetNat
        "Add-NetNatExternalAddress|Add-NetNatStaticMapping|Get-NetNat|Get-NetNatExternalAddress|Get-NetNatGlobal|Get-NetNatSession|Get-NetNatStaticMapping|New-NetNat|Remove-NetNat|Remove-NetNatExternalAddress|Remove-NetNatStaticMapping|Set-NetNat|Set-NetNatGlobal|" +
        // Module NetQos
        "Get-NetQosPolicy|New-NetQosPolicy|Remove-NetQosPolicy|Set-NetQosPolicy|" +
        // Module NetSecurity
        "Copy-NetFirewallRule|Copy-NetIPsecMainModeCryptoSet|Copy-NetIPsecMainModeRule|Copy-NetIPsecPhase1AuthSet|Copy-NetIPsecPhase2AuthSet|Copy-NetIPsecQuickModeCryptoSet|Copy-NetIPsecRule|Disable-NetFirewallRule|Disable-NetIPsecMainModeRule|Disable-NetIPsecRule|Enable-NetFirewallRule|Enable-NetIPsecMainModeRule|Enable-NetIPsecRule|Find-NetIPsecRule|Get-NetFirewallAddressFilter|Get-NetFirewallApplicationFilter|Get-NetFirewallInterfaceFilter|Get-NetFirewallInterfaceTypeFilter|Get-NetFirewallPortFilter|Get-NetFirewallProfile|Get-NetFirewallRule|Get-NetFirewallSecurityFilter|Get-NetFirewallServiceFilter|Get-NetFirewallSetting|Get-NetIPsecDospSetting|Get-NetIPsecMainModeCryptoSet|Get-NetIPsecMainModeRule|Get-NetIPsecMainModeSA|Get-NetIPsecPhase1AuthSet|Get-NetIPsecPhase2AuthSet|Get-NetIPsecQuickModeCryptoSet|Get-NetIPsecQuickModeSA|Get-NetIPsecRule|New-NetFirewallRule|New-NetIPsecDospSetting|New-NetIPsecMainModeCryptoSet|New-NetIPsecMainModeRule|New-NetIPsecPhase1AuthSet|New-NetIPsecPhase2AuthSet|New-NetIPsecQuickModeCryptoSet|New-NetIPsecRule|Open-NetGPO|Remove-NetFirewallRule|Remove-NetIPsecDospSetting|Remove-NetIPsecMainModeCryptoSet|Remove-NetIPsecMainModeRule|Remove-NetIPsecMainModeSA|Remove-NetIPsecPhase1AuthSet|Remove-NetIPsecPhase2AuthSet|Remove-NetIPsecQuickModeCryptoSet|Remove-NetIPsecQuickModeSA|Remove-NetIPsecRule|Rename-NetFirewallRule|Rename-NetIPsecMainModeCryptoSet|Rename-NetIPsecMainModeRule|Rename-NetIPsecPhase1AuthSet|Rename-NetIPsecPhase2AuthSet|Rename-NetIPsecQuickModeCryptoSet|Rename-NetIPsecRule|Save-NetGPO|Set-NetFirewallAddressFilter|Set-NetFirewallApplicationFilter|Set-NetFirewallInterfaceFilter|Set-NetFirewallInterfaceTypeFilter|Set-NetFirewallPortFilter|Set-NetFirewallProfile|Set-NetFirewallRule|Set-NetFirewallSecurityFilter|Set-NetFirewallServiceFilter|Set-NetFirewallSetting|Set-NetIPsecDospSetting|Set-NetIPsecMainModeCryptoSet|Set-NetIPsecMainModeRule|Set-NetIPsecPhase1AuthSet|Set-NetIPsecPhase2AuthSet|Set-NetIPsecQuickModeCryptoSet|Set-NetIPsecRule|Show-NetFirewallRule|Show-NetIPsecRule|Sync-NetIPsecRule|Update-NetIPsecRule|Get-DAPolicyChange|New-NetIPsecAuthProposal|New-NetIPsecMainModeCryptoProposal|New-NetIPsecQuickModeCryptoProposal|" +
        // Module NetSwitchTeam
        "Add-NetSwitchTeamMember|Get-NetSwitchTeam|Get-NetSwitchTeamMember|New-NetSwitchTeam|Remove-NetSwitchTeam|Remove-NetSwitchTeamMember|Rename-NetSwitchTeam|" +
        // Module NetTCPIP
        "Find-NetRoute|Get-NetCompartment|Get-NetIPAddress|Get-NetIPConfiguration|Get-NetIPInterface|Get-NetIPv4Protocol|Get-NetIPv6Protocol|Get-NetNeighbor|Get-NetOffloadGlobalSetting|Get-NetPrefixPolicy|Get-NetRoute|Get-NetTCPConnection|Get-NetTCPSetting|Get-NetTransportFilter|Get-NetUDPEndpoint|Get-NetUDPSetting|New-NetIPAddress|New-NetNeighbor|New-NetRoute|New-NetTransportFilter|Remove-NetIPAddress|Remove-NetNeighbor|Remove-NetRoute|Remove-NetTransportFilter|Set-NetIPAddress|Set-NetIPInterface|Set-NetIPv4Protocol|Set-NetIPv6Protocol|Set-NetNeighbor|Set-NetOffloadGlobalSetting|Set-NetRoute|Set-NetTCPSetting|Set-NetUDPSetting|Test-NetConnection|" +
        // Module NetworkConnectivityStatus
        "Get-DAConnectionStatus|Get-NCSIPolicyConfiguration|Reset-NCSIPolicyConfiguration|Set-NCSIPolicyConfiguration|" +
        // Module NetworkSwitchManager
        "Disable-NetworkSwitchEthernetPort|Disable-NetworkSwitchFeature|Disable-NetworkSwitchVlan|Enable-NetworkSwitchEthernetPort|Enable-NetworkSwitchFeature|Enable-NetworkSwitchVlan|Get-NetworkSwitchEthernetPort|Get-NetworkSwitchFeature|Get-NetworkSwitchGlobalData|Get-NetworkSwitchVlan|New-NetworkSwitchVlan|Remove-NetworkSwitchEthernetPortIPAddress|Remove-NetworkSwitchVlan|Restore-NetworkSwitchConfiguration|Save-NetworkSwitchConfiguration|Set-NetworkSwitchEthernetPortIPAddress|Set-NetworkSwitchPortMode|Set-NetworkSwitchPortProperty|Set-NetworkSwitchVlanProperty|" +
        // Module NetworkTransition
        "Add-NetIPHttpsCertBinding|Disable-NetDnsTransitionConfiguration|Disable-NetIPHttpsProfile|Disable-NetNatTransitionConfiguration|Enable-NetDnsTransitionConfiguration|Enable-NetIPHttpsProfile|Enable-NetNatTransitionConfiguration|Get-Net6to4Configuration|Get-NetDnsTransitionConfiguration|Get-NetDnsTransitionMonitoring|Get-NetIPHttpsConfiguration|Get-NetIPHttpsState|Get-NetIsatapConfiguration|Get-NetNatTransitionConfiguration|Get-NetNatTransitionMonitoring|Get-NetTeredoConfiguration|Get-NetTeredoState|New-NetIPHttpsConfiguration|New-NetNatTransitionConfiguration|Remove-NetIPHttpsCertBinding|Remove-NetIPHttpsConfiguration|Remove-NetNatTransitionConfiguration|Rename-NetIPHttpsConfiguration|Reset-Net6to4Configuration|Reset-NetDnsTransitionConfiguration|Reset-NetIPHttpsConfiguration|Reset-NetIsatapConfiguration|Reset-NetTeredoConfiguration|Set-Net6to4Configuration|Set-NetDnsTransitionConfiguration|Set-NetIPHttpsConfiguration|Set-NetIsatapConfiguration|Set-NetNatTransitionConfiguration|Set-NetTeredoConfiguration|" +
        // Module PackageManagement
        "Find-Package|Find-PackageProvider|Get-Package|Get-PackageProvider|Get-PackageSource|Import-PackageProvider|Install-Package|Install-PackageProvider|Register-PackageSource|Save-Package|Set-PackageSource|Uninstall-Package|Unregister-PackageSource|" +
        // Module PcsvDevice
        "Clear-PcsvDeviceLog|Get-PcsvDevice|Get-PcsvDeviceLog|Restart-PcsvDevice|Set-PcsvDeviceBootConfiguration|Set-PcsvDeviceNetworkConfiguration|Set-PcsvDeviceUserPassword|Start-PcsvDevice|Stop-PcsvDevice|" +
        // Module Pester
        "AfterAll|AfterEach|Assert-MockCalled|Assert-VerifiableMocks|BeforeAll|BeforeEach|Context|Describe|Get-MockDynamicParameters|Get-TestDriveItem|In|InModuleScope|Invoke-Mock|Invoke-Pester|It|Mock|New-Fixture|Set-DynamicParameterVariables|Setup|Should|" +
        // Module PKI
        "Add-CertificateEnrollmentPolicyServer|Export-Certificate|Export-PfxCertificate|Get-Certificate|Get-CertificateAutoEnrollmentPolicy|Get-CertificateEnrollmentPolicyServer|Get-CertificateNotificationTask|Get-PfxData|Import-Certificate|Import-PfxCertificate|New-CertificateNotificationTask|New-SelfSignedCertificate|Remove-CertificateEnrollmentPolicyServer|Remove-CertificateNotificationTask|Set-CertificateAutoEnrollmentPolicy|Switch-Certificate|Test-Certificate|" +
        // Module PnpDevice
        "Disable-PnpDevice|Enable-PnpDevice|Get-PnpDevice|Get-PnpDeviceProperty|" +
        // Module PowerShellGet
        "Find-DscResource|Find-Module|Find-Script|Get-InstalledModule|Get-InstalledScript|Get-PSRepository|Install-Module|Install-Script|New-ScriptFileInfo|Publish-Module|Publish-Script|Register-PSRepository|Save-Module|Save-Script|Set-PSRepository|Test-ScriptFileInfo|Uninstall-Module|Uninstall-Script|Unregister-PSRepository|Update-Module|Update-ModuleManifest|Update-Script|Update-ScriptFileInfo|" +
        // Module PrintManagement
        "Add-Printer|Add-PrinterDriver|Add-PrinterPort|Get-PrintConfiguration|Get-Printer|Get-PrinterDriver|Get-PrinterPort|Get-PrinterProperty|Get-PrintJob|Read-PrinterNfcTag|Remove-Printer|Remove-PrinterDriver|Remove-PrinterPort|Remove-PrintJob|Rename-Printer|Restart-PrintJob|Resume-PrintJob|Set-PrintConfiguration|Set-Printer|Set-PrinterProperty|Suspend-PrintJob|Write-PrinterNfcTag|" +
        // Module PSDesiredStateConfiguration
        "Configuration|Disable-DscDebug|Enable-DscDebug|Get-DscConfiguration|Get-DscConfigurationStatus|Get-DscLocalConfigurationManager|Get-DscResource|New-DscChecksum|Remove-DscConfigurationDocument|Restore-DscConfiguration|Stop-DscConfiguration|Invoke-DscResource|Publish-DscConfiguration|Set-DscLocalConfigurationManager|Start-DscConfiguration|Test-DscConfiguration|Update-DscConfiguration|" +
        // Module PSDiagnostics
        "Disable-PSTrace|Disable-PSWSManCombinedTrace|Disable-WSManTrace|Enable-PSTrace|Enable-PSWSManCombinedTrace|Enable-WSManTrace|Get-LogProperties|Set-LogProperties|Start-Trace|Stop-Trace|" +
        // Module PSReadline
        "PSConsoleHostReadline|Get-PSReadlineKeyHandler|Get-PSReadlineOption|Remove-PSReadlineKeyHandler|Set-PSReadlineKeyHandler|Set-PSReadlineOption|" +
        // Module PSScheduledJob
        "Add-JobTrigger|Disable-JobTrigger|Disable-ScheduledJob|Enable-JobTrigger|Enable-ScheduledJob|Get-JobTrigger|Get-ScheduledJob|Get-ScheduledJobOption|New-JobTrigger|New-ScheduledJobOption|Register-ScheduledJob|Remove-JobTrigger|Set-JobTrigger|Set-ScheduledJob|Set-ScheduledJobOption|Unregister-ScheduledJob|" +
        // Module PSWorkflow
        "New-PSWorkflowSession|New-PSWorkflowExecutionOption|" +
        // Module PSWorkflowUtility
        "Invoke-AsWorkflow|" +
        // Module ScheduledTasks
        "Disable-ScheduledTask|Enable-ScheduledTask|Export-ScheduledTask|Get-ClusteredScheduledTask|Get-ScheduledTask|Get-ScheduledTaskInfo|New-ScheduledTask|New-ScheduledTaskAction|New-ScheduledTaskPrincipal|New-ScheduledTaskSettingsSet|New-ScheduledTaskTrigger|Register-ClusteredScheduledTask|Register-ScheduledTask|Set-ClusteredScheduledTask|Set-ScheduledTask|Start-ScheduledTask|Stop-ScheduledTask|Unregister-ClusteredScheduledTask|Unregister-ScheduledTask|" +
        // Module SecureBoot
        "Confirm-SecureBootUEFI|Format-SecureBootUEFI|Get-SecureBootPolicy|Get-SecureBootUEFI|Set-SecureBootUEFI|" +
        // Module SmbShare
        "Block-SmbShareAccess|Close-SmbOpenFile|Close-SmbSession|Disable-SmbDelegation|Enable-SmbDelegation|Get-SmbBandwidthLimit|Get-SmbClientConfiguration|Get-SmbClientNetworkInterface|Get-SmbConnection|Get-SmbDelegation|Get-SmbMapping|Get-SmbMultichannelConnection|Get-SmbMultichannelConstraint|Get-SmbOpenFile|Get-SmbServerConfiguration|Get-SmbServerNetworkInterface|Get-SmbSession|Get-SmbShare|Get-SmbShareAccess|Grant-SmbShareAccess|New-SmbMapping|New-SmbMultichannelConstraint|New-SmbShare|Remove-SmbBandwidthLimit|Remove-SmbMapping|Remove-SmbMultichannelConstraint|Remove-SmbShare|Revoke-SmbShareAccess|Set-SmbBandwidthLimit|Set-SmbClientConfiguration|Set-SmbPathAcl|Set-SmbServerConfiguration|Set-SmbShare|Unblock-SmbShareAccess|Update-SmbMultichannelConnection|" +
        // Module SmbWitness
        "Move-SmbClient|Get-SmbWitnessClient|Move-SmbWitnessClient|" +
        // Module StartLayout
        "Get-StartApps|Export-StartLayout|Import-StartLayout|" +
        // Module Storage
        "Disable-PhysicalDiskIndication|Disable-StorageDiagnosticLog|Enable-PhysicalDiskIndication|Enable-StorageDiagnosticLog|Flush-Volume|Get-DiskSNV|Get-PhysicalDiskSNV|Get-StorageEnclosureSNV|Initialize-Volume|Write-FileSystemCache|Add-InitiatorIdToMaskingSet|Add-PartitionAccessPath|Add-PhysicalDisk|Add-TargetPortToMaskingSet|Add-VirtualDiskToMaskingSet|Block-FileShareAccess|Clear-Disk|Clear-FileStorageTier|Clear-StorageDiagnosticInfo|Connect-VirtualDisk|Debug-FileShare|Debug-StorageSubSystem|Debug-Volume|Disable-PhysicalDiskIdentification|Disable-StorageEnclosureIdentification|Disable-StorageHighAvailability|Disconnect-VirtualDisk|Dismount-DiskImage|Enable-PhysicalDiskIdentification|Enable-StorageEnclosureIdentification|Enable-StorageHighAvailability|Format-Volume|Get-DedupProperties|Get-Disk|Get-DiskImage|Get-DiskStorageNodeView|Get-FileIntegrity|Get-FileShare|Get-FileShareAccessControlEntry|Get-FileStorageTier|Get-InitiatorId|Get-InitiatorPort|Get-MaskingSet|Get-OffloadDataTransferSetting|Get-Partition|Get-PartitionSupportedSize|Get-PhysicalDisk|Get-PhysicalDiskStorageNodeView|Get-ResiliencySetting|Get-StorageAdvancedProperty|Get-StorageDiagnosticInfo|Get-StorageEnclosure|Get-StorageEnclosureStorageNodeView|Get-StorageEnclosureVendorData|Get-StorageFaultDomain|Get-StorageFileServer|Get-StorageFirmwareInformation|Get-StorageHealthAction|Get-StorageHealthReport|Get-StorageHealthSetting|Get-StorageJob|Get-StorageNode|Get-StoragePool|Get-StorageProvider|Get-StorageReliabilityCounter|Get-StorageSetting|Get-StorageSubSystem|Get-StorageTier|Get-StorageTierSupportedSize|Get-SupportedClusterSizes|Get-SupportedFileSystems|Get-TargetPort|Get-TargetPortal|Get-VirtualDisk|Get-VirtualDiskSupportedSize|Get-Volume|Get-VolumeCorruptionCount|Get-VolumeScrubPolicy|Grant-FileShareAccess|Hide-VirtualDisk|Initialize-Disk|Mount-DiskImage|New-FileShare|New-MaskingSet|New-Partition|New-StorageFileServer|New-StoragePool|New-StorageSubsystemVirtualDisk|New-StorageTier|New-VirtualDisk|New-VirtualDiskClone|New-VirtualDiskSnapshot|New-Volume|Optimize-StoragePool|Optimize-Volume|Register-StorageSubsystem|Remove-FileShare|Remove-InitiatorId|Remove-InitiatorIdFromMaskingSet|Remove-MaskingSet|Remove-Partition|Remove-PartitionAccessPath|Remove-PhysicalDisk|Remove-StorageFileServer|Remove-StorageHealthSetting|Remove-StoragePool|Remove-StorageTier|Remove-TargetPortFromMaskingSet|Remove-VirtualDisk|Remove-VirtualDiskFromMaskingSet|Rename-MaskingSet|Repair-FileIntegrity|Repair-VirtualDisk|Repair-Volume|Reset-PhysicalDisk|Reset-StorageReliabilityCounter|Resize-Partition|Resize-StorageTier|Resize-VirtualDisk|Revoke-FileShareAccess|Set-Disk|Set-FileIntegrity|Set-FileShare|Set-FileStorageTier|Set-InitiatorPort|Set-Partition|Set-PhysicalDisk|Set-ResiliencySetting|Set-StorageFileServer|Set-StorageHealthSetting|Set-StoragePool|Set-StorageProvider|Set-StorageSetting|Set-StorageSubSystem|Set-StorageTier|Set-VirtualDisk|Set-Volume|Set-VolumeScrubPolicy|Show-VirtualDisk|Start-StorageDiagnosticLog|Stop-StorageDiagnosticLog|Stop-StorageJob|Unblock-FileShareAccess|Unregister-StorageSubsystem|Update-Disk|Update-HostStorageCache|Update-StorageFirmware|Update-StoragePool|Update-StorageProviderCache|Write-VolumeCache|" +
        // Module TLS
        "Disable-TlsCipherSuite|Disable-TlsSessionTicketKey|Enable-TlsCipherSuite|Enable-TlsSessionTicketKey|Export-TlsSessionTicketKey|Get-TlsCipherSuite|New-TlsSessionTicketKey|" +
        // Module TroubleshootingPack
        "Get-TroubleshootingPack|Invoke-TroubleshootingPack|" +
        // Module TrustedPlatformModule
        "Clear-Tpm|ConvertTo-TpmOwnerAuth|Disable-TpmAutoProvisioning|Enable-TpmAutoProvisioning|Get-Tpm|Get-TpmEndorsementKeyInfo|Get-TpmSupportedFeature|Import-TpmOwnerAuth|Initialize-Tpm|Set-TpmOwnerAuth|Unblock-Tpm|" +
        // Module VpnClient
        "Add-VpnConnection|Add-VpnConnectionRoute|Add-VpnConnectionTriggerApplication|Add-VpnConnectionTriggerDnsConfiguration|Add-VpnConnectionTriggerTrustedNetwork|Get-VpnConnection|Get-VpnConnectionTrigger|New-EapConfiguration|New-VpnServerAddress|Remove-VpnConnection|Remove-VpnConnectionRoute|Remove-VpnConnectionTriggerApplication|Remove-VpnConnectionTriggerDnsConfiguration|Remove-VpnConnectionTriggerTrustedNetwork|Set-VpnConnection|Set-VpnConnectionIPsecConfiguration|Set-VpnConnectionProxy|Set-VpnConnectionTriggerDnsConfiguration|Set-VpnConnectionTriggerTrustedNetwork|" +
        // Module Wdac
        "Add-OdbcDsn|Disable-OdbcPerfCounter|Disable-WdacBidTrace|Enable-OdbcPerfCounter|Enable-WdacBidTrace|Get-OdbcDriver|Get-OdbcDsn|Get-OdbcPerfCounter|Get-WdacBidTrace|Remove-OdbcDsn|Set-OdbcDriver|Set-OdbcDsn|" +
        // Module WindowsDeveloperLicense
        "Get-WindowsDeveloperLicense|Show-WindowsDeveloperLicenseRegistration|Unregister-WindowsDeveloperLicense|" +
        // Module WindowsErrorReporting
        "Disable-WindowsErrorReporting|Enable-WindowsErrorReporting|Get-WindowsErrorReporting|" +
        // Module WindowsSearch
        "Get-WindowsSearchSetting|Set-WindowsSearchSetting|" +
        // Module WindowsUpdate
        "Get-WindowsUpdateLog"
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "keyword": keywords
    }, "identifier");

    // Help Reference: about_Operators
    // https://technet.microsoft.com/en-us/library/hh847732.aspx
    var binaryOperatorsRe = (
        // Comparison Operators
        "eq|ne|gt|lt|le|ge|like|notlike|match|notmatch|contains|notcontains|in|notin|band|bor|bxor|bnot|" + 
        "ceq|cne|cgt|clt|cle|cge|clike|cnotlike|cmatch|cnotmatch|ccontains|cnotcontains|cin|cnotin|" + 
        "ieq|ine|igt|ilt|ile|ige|ilike|inotlike|imatch|inotmatch|icontains|inotcontains|iin|inotin|" +
        // Logical Operators
        "and|or|xor|not|" +
        // String Operators
        "split|join|replace|f|" +
        "csplit|creplace|" +
        "isplit|ireplace|" +
        // Type Operators
        "is|isnot|as|" +
        // Shift Operators
        "shl|shr"
    );

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "#.*$"
            }, {
                token : "comment.start",
                regex : "<#",
                next : "comment"
            }, {
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "string", // single line
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "constant.numeric", // hex
                regex : "0[xX][0-9a-fA-F]+\\b"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : "constant.language.boolean",
                regex : "[$](?:[Tt]rue|[Ff]alse)\\b"
            }, {
                token : "constant.language",
                regex : "[$][Nn]ull\\b"
            }, {
                token : "variable.instance",
                regex : "[$][a-zA-Z][a-zA-Z0-9_]*\\b"
            }, {
                token : keywordMapper,
                // TODO: Unicode escape sequences
                // TODO: Unicode identifiers
                regex : "[a-zA-Z_$][a-zA-Z0-9_$\\-]*\\b"
            }, {
                token : "keyword.operator",
                regex : "\\-(?:" + binaryOperatorsRe + ")"
            }, {
                // Arithmetic, Assignment, Redirection, Call, Not & Pipeline Operators
                token : "keyword.operator",
                regex : "&|\\+|\\-|\\*|\\/|\\%|\\=|\\>|\\&|\\!|\\|"
            }, {
                token : "lparen",
                regex : "[[({]"
            }, {
                token : "rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "comment" : [
            {
                token : "comment.end",
                regex : "#>",
                next : "start"
            }, {
                token : "doc.comment.tag",
                regex : "^\\.\\w+"
            }, {
                defaultToken : "comment"
            }
        ]
    };
};

oop.inherits(PowershellHighlightRules, TextHighlightRules);

exports.S = PowershellHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjY3MDAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQWU7QUFDakMsWUFBWSwyQ0FBNEI7QUFDeEMsbUJBQW1CLHFDQUErQjs7QUFFbEQsZUFBZSxTQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0MscUNBQXFDLFFBQVE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDOUpZOztBQUViLFlBQVksMkNBQXlCOztBQUVyQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDOztBQUVBO0FBQ0Esb0RBQW9ELHlCQUF5Qjs7QUFFN0U7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELDRCQUE0Qjs7Ozs7Ozs7QUNwQ2Y7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsK0JBQStCLDhEQUFnRTtBQUMvRiwyQkFBMkIsZ0RBQXdEO0FBQ25GLHFCQUFxQiw4Q0FBb0M7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHlDQUF5QztBQUNyRjtBQUNBOztBQUVBOztBQUVBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDekRDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsZ0JBQWdCLDJGQUEyRjtBQUMvSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDZCQUE2QjtBQUM3QixhQUFhO0FBQ2I7QUFDQSwrQkFBK0I7QUFDL0IsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBZ0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Bvd2Vyc2hlbGwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9wb3dlcnNoZWxsX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgUG93ZXJzaGVsbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcG93ZXJzaGVsbF9oaWdobGlnaHRfcnVsZXNcIikuUG93ZXJzaGVsbEhpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBQb3dlcnNoZWxsSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ1N0eWxlRm9sZE1vZGUoe3N0YXJ0OiBcIl5cXFxccyooPCMpXCIsIGVuZDogXCJeWyNcXFxcc10+XFxcXHMqJFwifSk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIjXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiPCNcIiwgZW5kOiBcIiM+XCJ9O1xuICAgIFxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuICAgICAgXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFtdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cblxuICAgIHRoaXMuY3JlYXRlV29ya2VyID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3Bvd2Vyc2hlbGxcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBQb3dlcnNoZWxsSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIEhlbHAgUmVmZXJlbmNlOiBhYm91dF9MYW5ndWFnZV9LZXl3b3Jkc1xuICAgIC8vIGh0dHBzOi8vdGVjaG5ldC5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaGg4NDc3NDQuYXNweFxuICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgXCJiZWdpbnxicmVha3xjYXRjaHxjb250aW51ZXxkYXRhfGRvfGR5bmFtaWNwYXJhbXxlbHNlfGVsc2VpZnxlbmR8ZXhpdHxmaWx0ZXJ8XCIgK1xuICAgICAgICBcImZpbmFsbHl8Zm9yfGZvcmVhY2h8ZnJvbXxmdW5jdGlvbnxpZnxpbnxpbmxpbmVzY3JpcHR8aGlkZGVufHBhcmFsbGVsfHBhcmFtfFwiICtcbiAgICAgICAgXCJwcm9jZXNzfHJldHVybnxzZXF1ZW5jZXxzd2l0Y2h8dGhyb3d8dHJhcHx0cnl8dW50aWx8d2hpbGV8d29ya2Zsb3dcIlxuICAgICk7XG5cbiAgICAvLyBDb21tYW5kIHRvIGVudW1lcmF0ZSBhbGwgbW9kdWxlIGNvbW1hbmRzIGluIFdpbmRvd3MgUG93ZXJTaGVsbDpcbiAgICAvLyBQUyBDOlxcPiBHZXQtTW9kdWxlIC1MaXN0QXZhaWxhYmxlIHwgU2VsZWN0LU9iamVjdCAtVW5pcXVlIE5hbWUgLUV4cGFuZFByb3BlcnR5IE5hbWUgfCBTb3J0LU9iamVjdCB8XG4gICAgLy8gICAgICAgICAgICAgRm9yRWFjaC1PYmplY3QgeyBcIi8vIE1vZHVsZSAkX1wiOyAnXCInICsgKChHZXQtQ29tbWFuZCAtTW9kdWxlICRfIHwgU2VsZWN0LU9iamVjdCAtRXhwYW5kUHJvcGVydHkgTmFtZSkgLWpvaW4gJ3wnKSArICd8XCIgKycgfSB8IGNsaXBcbiAgICB2YXIgYnVpbHRpbkZ1bmN0aW9ucyA9IChcbiAgICAgICAgLy8gTW9kdWxlIEFwcEJhY2tncm91bmRUYXNrXG4gICAgICAgIFwiR2V0LUFwcEJhY2tncm91bmRUYXNrfFN0YXJ0LUFwcEJhY2tncm91bmRUYXNrfFVucmVnaXN0ZXItQXBwQmFja2dyb3VuZFRhc2t8RGlzYWJsZS1BcHBCYWNrZ3JvdW5kVGFza0RpYWdub3N0aWNMb2d8RW5hYmxlLUFwcEJhY2tncm91bmRUYXNrRGlhZ25vc3RpY0xvZ3xTZXQtQXBwQmFja2dyb3VuZFRhc2tSZXNvdXJjZVBvbGljeXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBBcHBMb2NrZXJcbiAgICAgICAgXCJHZXQtQXBwTG9ja2VyRmlsZUluZm9ybWF0aW9ufEdldC1BcHBMb2NrZXJQb2xpY3l8TmV3LUFwcExvY2tlclBvbGljeXxTZXQtQXBwTG9ja2VyUG9saWN5fFRlc3QtQXBwTG9ja2VyUG9saWN5fFwiICtcbiAgICAgICAgLy8gTW9kdWxlIEFwcHhcbiAgICAgICAgXCJHZXQtQXBweExhc3RFcnJvcnxHZXQtQXBweExvZ3xBZGQtQXBweFBhY2thZ2V8QWRkLUFwcHhWb2x1bWV8RGlzbW91bnQtQXBweFZvbHVtZXxHZXQtQXBweERlZmF1bHRWb2x1bWV8R2V0LUFwcHhQYWNrYWdlfEdldC1BcHB4UGFja2FnZU1hbmlmZXN0fEdldC1BcHB4Vm9sdW1lfE1vdW50LUFwcHhWb2x1bWV8TW92ZS1BcHB4UGFja2FnZXxSZW1vdmUtQXBweFBhY2thZ2V8UmVtb3ZlLUFwcHhWb2x1bWV8U2V0LUFwcHhEZWZhdWx0Vm9sdW1lfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIEFzc2lnbmVkQWNjZXNzXG4gICAgICAgIFwiQ2xlYXItQXNzaWduZWRBY2Nlc3N8R2V0LUFzc2lnbmVkQWNjZXNzfFNldC1Bc3NpZ25lZEFjY2Vzc3xcIiArXG4gICAgICAgIC8vIE1vZHVsZSBCaXRMb2NrZXJcbiAgICAgICAgXCJBZGQtQml0TG9ja2VyS2V5UHJvdGVjdG9yfEJhY2t1cC1CaXRMb2NrZXJLZXlQcm90ZWN0b3J8Q2xlYXItQml0TG9ja2VyQXV0b1VubG9ja3xEaXNhYmxlLUJpdExvY2tlcnxEaXNhYmxlLUJpdExvY2tlckF1dG9VbmxvY2t8RW5hYmxlLUJpdExvY2tlcnxFbmFibGUtQml0TG9ja2VyQXV0b1VubG9ja3xHZXQtQml0TG9ja2VyVm9sdW1lfExvY2stQml0TG9ja2VyfFJlbW92ZS1CaXRMb2NrZXJLZXlQcm90ZWN0b3J8UmVzdW1lLUJpdExvY2tlcnxTdXNwZW5kLUJpdExvY2tlcnxVbmxvY2stQml0TG9ja2VyfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIEJpdHNUcmFuc2ZlclxuICAgICAgICBcIkFkZC1CaXRzRmlsZXxDb21wbGV0ZS1CaXRzVHJhbnNmZXJ8R2V0LUJpdHNUcmFuc2ZlcnxSZW1vdmUtQml0c1RyYW5zZmVyfFJlc3VtZS1CaXRzVHJhbnNmZXJ8U2V0LUJpdHNUcmFuc2ZlcnxTdGFydC1CaXRzVHJhbnNmZXJ8U3VzcGVuZC1CaXRzVHJhbnNmZXJ8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgQnJhbmNoQ2FjaGVcbiAgICAgICAgXCJBZGQtQkNEYXRhQ2FjaGVFeHRlbnNpb258Q2xlYXItQkNDYWNoZXxEaXNhYmxlLUJDfERpc2FibGUtQkNEb3duZ3JhZGluZ3xEaXNhYmxlLUJDU2VydmVPbkJhdHRlcnl8RW5hYmxlLUJDRGlzdHJpYnV0ZWR8RW5hYmxlLUJDRG93bmdyYWRpbmd8RW5hYmxlLUJDSG9zdGVkQ2xpZW50fEVuYWJsZS1CQ0hvc3RlZFNlcnZlcnxFbmFibGUtQkNMb2NhbHxFbmFibGUtQkNTZXJ2ZU9uQmF0dGVyeXxFeHBvcnQtQkNDYWNoZVBhY2thZ2V8RXhwb3J0LUJDU2VjcmV0S2V5fEdldC1CQ0NsaWVudENvbmZpZ3VyYXRpb258R2V0LUJDQ29udGVudFNlcnZlckNvbmZpZ3VyYXRpb258R2V0LUJDRGF0YUNhY2hlfEdldC1CQ0RhdGFDYWNoZUV4dGVuc2lvbnxHZXQtQkNIYXNoQ2FjaGV8R2V0LUJDSG9zdGVkQ2FjaGVTZXJ2ZXJDb25maWd1cmF0aW9ufEdldC1CQ05ldHdvcmtDb25maWd1cmF0aW9ufEdldC1CQ1N0YXR1c3xJbXBvcnQtQkNDYWNoZVBhY2thZ2V8SW1wb3J0LUJDU2VjcmV0S2V5fFB1Ymxpc2gtQkNGaWxlQ29udGVudHxQdWJsaXNoLUJDV2ViQ29udGVudHxSZW1vdmUtQkNEYXRhQ2FjaGVFeHRlbnNpb258UmVzZXQtQkN8U2V0LUJDQXV0aGVudGljYXRpb258U2V0LUJDQ2FjaGV8U2V0LUJDRGF0YUNhY2hlRW50cnlNYXhBZ2V8U2V0LUJDTWluU01CTGF0ZW5jeXxTZXQtQkNTZWNyZXRLZXl8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgQ2ltQ21kbGV0c1xuICAgICAgICBcIkV4cG9ydC1CaW5hcnlNaUxvZ3xHZXQtQ2ltQXNzb2NpYXRlZEluc3RhbmNlfEdldC1DaW1DbGFzc3xHZXQtQ2ltSW5zdGFuY2V8R2V0LUNpbVNlc3Npb258SW1wb3J0LUJpbmFyeU1pTG9nfEludm9rZS1DaW1NZXRob2R8TmV3LUNpbUluc3RhbmNlfE5ldy1DaW1TZXNzaW9ufE5ldy1DaW1TZXNzaW9uT3B0aW9ufFJlZ2lzdGVyLUNpbUluZGljYXRpb25FdmVudHxSZW1vdmUtQ2ltSW5zdGFuY2V8UmVtb3ZlLUNpbVNlc3Npb258U2V0LUNpbUluc3RhbmNlfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIENJUG9saWN5XG4gICAgICAgIFwiQ29udmVydEZyb20tQ0lQb2xpY3l8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgQ29uZmlnQ0lcbiAgICAgICAgXCJBZGQtU2lnbmVyUnVsZXxFZGl0LUNJUG9saWN5UnVsZXxHZXQtQ0lQb2xpY3l8R2V0LUNJUG9saWN5SW5mb3xHZXQtU3lzdGVtRHJpdmVyfE1lcmdlLUNJUG9saWN5fE5ldy1DSVBvbGljeXxOZXctQ0lQb2xpY3lSdWxlfFJlbW92ZS1DSVBvbGljeVJ1bGV8U2V0LUNJUG9saWN5VmVyc2lvbnxTZXQtSFZDSU9wdGlvbnN8U2V0LVJ1bGVPcHRpb258XCIgK1xuICAgICAgICAvLyBNb2R1bGUgRGVmZW5kZXJcbiAgICAgICAgXCJBZGQtTXBQcmVmZXJlbmNlfEdldC1NcENvbXB1dGVyU3RhdHVzfEdldC1NcFByZWZlcmVuY2V8R2V0LU1wVGhyZWF0fEdldC1NcFRocmVhdENhdGFsb2d8R2V0LU1wVGhyZWF0RGV0ZWN0aW9ufFJlbW92ZS1NcFByZWZlcmVuY2V8UmVtb3ZlLU1wVGhyZWF0fFNldC1NcFByZWZlcmVuY2V8U3RhcnQtTXBTY2FufFN0YXJ0LU1wV0RPU2NhbnxVcGRhdGUtTXBTaWduYXR1cmV8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgRGlyZWN0QWNjZXNzQ2xpZW50Q29tcG9uZW50c1xuICAgICAgICBcIkRpc2FibGUtREFNYW51YWxFbnRyeVBvaW50U2VsZWN0aW9ufEVuYWJsZS1EQU1hbnVhbEVudHJ5UG9pbnRTZWxlY3Rpb258R2V0LURBQ2xpZW50RXhwZXJpZW5jZUNvbmZpZ3VyYXRpb258R2V0LURBRW50cnlQb2ludFRhYmxlSXRlbXxOZXctREFFbnRyeVBvaW50VGFibGVJdGVtfFJlbW92ZS1EQUVudHJ5UG9pbnRUYWJsZUl0ZW18UmVuYW1lLURBRW50cnlQb2ludFRhYmxlSXRlbXxSZXNldC1EQUNsaWVudEV4cGVyaWVuY2VDb25maWd1cmF0aW9ufFJlc2V0LURBRW50cnlQb2ludFRhYmxlSXRlbXxTZXQtREFDbGllbnRFeHBlcmllbmNlQ29uZmlndXJhdGlvbnxTZXQtREFFbnRyeVBvaW50VGFibGVJdGVtfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIERpc21cbiAgICAgICAgXCJBZGQtUHJvdmlzaW9uZWRBcHB4UGFja2FnZXxBcHBseS1XaW5kb3dzVW5hdHRlbmR8R2V0LVByb3Zpc2lvbmVkQXBweFBhY2thZ2V8UmVtb3ZlLVByb3Zpc2lvbmVkQXBweFBhY2thZ2V8QWRkLUFwcHhQcm92aXNpb25lZFBhY2thZ2V8QWRkLVdpbmRvd3NDYXBhYmlsaXR5fEFkZC1XaW5kb3dzRHJpdmVyfEFkZC1XaW5kb3dzSW1hZ2V8QWRkLVdpbmRvd3NQYWNrYWdlfENsZWFyLVdpbmRvd3NDb3JydXB0TW91bnRQb2ludHxEaXNhYmxlLVdpbmRvd3NPcHRpb25hbEZlYXR1cmV8RGlzbW91bnQtV2luZG93c0ltYWdlfEVuYWJsZS1XaW5kb3dzT3B0aW9uYWxGZWF0dXJlfEV4cGFuZC1XaW5kb3dzQ3VzdG9tRGF0YUltYWdlfEV4cGFuZC1XaW5kb3dzSW1hZ2V8RXhwb3J0LVdpbmRvd3NEcml2ZXJ8RXhwb3J0LVdpbmRvd3NJbWFnZXxHZXQtQXBweFByb3Zpc2lvbmVkUGFja2FnZXxHZXQtV0lNQm9vdEVudHJ5fEdldC1XaW5kb3dzQ2FwYWJpbGl0eXxHZXQtV2luZG93c0RyaXZlcnxHZXQtV2luZG93c0VkaXRpb258R2V0LVdpbmRvd3NJbWFnZXxHZXQtV2luZG93c0ltYWdlQ29udGVudHxHZXQtV2luZG93c09wdGlvbmFsRmVhdHVyZXxHZXQtV2luZG93c1BhY2thZ2V8TW91bnQtV2luZG93c0ltYWdlfE5ldy1XaW5kb3dzQ3VzdG9tSW1hZ2V8TmV3LVdpbmRvd3NJbWFnZXxPcHRpbWl6ZS1XaW5kb3dzSW1hZ2V8UmVtb3ZlLUFwcHhQcm92aXNpb25lZFBhY2thZ2V8UmVtb3ZlLVdpbmRvd3NDYXBhYmlsaXR5fFJlbW92ZS1XaW5kb3dzRHJpdmVyfFJlbW92ZS1XaW5kb3dzSW1hZ2V8UmVtb3ZlLVdpbmRvd3NQYWNrYWdlfFJlcGFpci1XaW5kb3dzSW1hZ2V8U2F2ZS1XaW5kb3dzSW1hZ2V8U2V0LUFwcFhQcm92aXNpb25lZERhdGFGaWxlfFNldC1XaW5kb3dzRWRpdGlvbnxTZXQtV2luZG93c1Byb2R1Y3RLZXl8U3BsaXQtV2luZG93c0ltYWdlfFVwZGF0ZS1XSU1Cb290RW50cnl8VXNlLVdpbmRvd3NVbmF0dGVuZHxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBEbnNDbGllbnRcbiAgICAgICAgXCJBZGQtRG5zQ2xpZW50TnJwdFJ1bGV8Q2xlYXItRG5zQ2xpZW50Q2FjaGV8R2V0LURuc0NsaWVudHxHZXQtRG5zQ2xpZW50Q2FjaGV8R2V0LURuc0NsaWVudEdsb2JhbFNldHRpbmd8R2V0LURuc0NsaWVudE5ycHRHbG9iYWx8R2V0LURuc0NsaWVudE5ycHRQb2xpY3l8R2V0LURuc0NsaWVudE5ycHRSdWxlfEdldC1EbnNDbGllbnRTZXJ2ZXJBZGRyZXNzfFJlZ2lzdGVyLURuc0NsaWVudHxSZW1vdmUtRG5zQ2xpZW50TnJwdFJ1bGV8U2V0LURuc0NsaWVudHxTZXQtRG5zQ2xpZW50R2xvYmFsU2V0dGluZ3xTZXQtRG5zQ2xpZW50TnJwdEdsb2JhbHxTZXQtRG5zQ2xpZW50TnJwdFJ1bGV8U2V0LURuc0NsaWVudFNlcnZlckFkZHJlc3N8UmVzb2x2ZS1EbnNOYW1lfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIEV2ZW50VHJhY2luZ01hbmFnZW1lbnRcbiAgICAgICAgXCJBZGQtRXR3VHJhY2VQcm92aWRlcnxHZXQtQXV0b2xvZ2dlckNvbmZpZ3xHZXQtRXR3VHJhY2VQcm92aWRlcnxHZXQtRXR3VHJhY2VTZXNzaW9ufE5ldy1BdXRvbG9nZ2VyQ29uZmlnfE5ldy1FdHdUcmFjZVNlc3Npb258UmVtb3ZlLUF1dG9sb2dnZXJDb25maWd8UmVtb3ZlLUV0d1RyYWNlUHJvdmlkZXJ8UmVtb3ZlLUV0d1RyYWNlU2Vzc2lvbnxTZW5kLUV0d1RyYWNlU2Vzc2lvbnxTZXQtQXV0b2xvZ2dlckNvbmZpZ3xTZXQtRXR3VHJhY2VQcm92aWRlcnxTZXQtRXR3VHJhY2VTZXNzaW9ufFwiICtcbiAgICAgICAgLy8gTW9kdWxlIEludGVybmF0aW9uYWxcbiAgICAgICAgXCJHZXQtV2luQWNjZXB0TGFuZ3VhZ2VGcm9tTGFuZ3VhZ2VMaXN0T3B0T3V0fEdldC1XaW5DdWx0dXJlRnJvbUxhbmd1YWdlTGlzdE9wdE91dHxHZXQtV2luRGVmYXVsdElucHV0TWV0aG9kT3ZlcnJpZGV8R2V0LVdpbkhvbWVMb2NhdGlvbnxHZXQtV2luTGFuZ3VhZ2VCYXJPcHRpb258R2V0LVdpblN5c3RlbUxvY2FsZXxHZXQtV2luVUlMYW5ndWFnZU92ZXJyaWRlfEdldC1XaW5Vc2VyTGFuZ3VhZ2VMaXN0fE5ldy1XaW5Vc2VyTGFuZ3VhZ2VMaXN0fFNldC1DdWx0dXJlfFNldC1XaW5BY2NlcHRMYW5ndWFnZUZyb21MYW5ndWFnZUxpc3RPcHRPdXR8U2V0LVdpbkN1bHR1cmVGcm9tTGFuZ3VhZ2VMaXN0T3B0T3V0fFNldC1XaW5EZWZhdWx0SW5wdXRNZXRob2RPdmVycmlkZXxTZXQtV2luSG9tZUxvY2F0aW9ufFNldC1XaW5MYW5ndWFnZUJhck9wdGlvbnxTZXQtV2luU3lzdGVtTG9jYWxlfFNldC1XaW5VSUxhbmd1YWdlT3ZlcnJpZGV8U2V0LVdpblVzZXJMYW5ndWFnZUxpc3R8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgaVNDU0lcbiAgICAgICAgXCJDb25uZWN0LUlzY3NpVGFyZ2V0fERpc2Nvbm5lY3QtSXNjc2lUYXJnZXR8R2V0LUlzY3NpQ29ubmVjdGlvbnxHZXQtSXNjc2lTZXNzaW9ufEdldC1Jc2NzaVRhcmdldHxHZXQtSXNjc2lUYXJnZXRQb3J0YWx8TmV3LUlzY3NpVGFyZ2V0UG9ydGFsfFJlZ2lzdGVyLUlzY3NpU2Vzc2lvbnxSZW1vdmUtSXNjc2lUYXJnZXRQb3J0YWx8U2V0LUlzY3NpQ2hhcFNlY3JldHxVbnJlZ2lzdGVyLUlzY3NpU2Vzc2lvbnxVcGRhdGUtSXNjc2lUYXJnZXR8VXBkYXRlLUlzY3NpVGFyZ2V0UG9ydGFsfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIElTRVxuICAgICAgICBcIkdldC1Jc2VTbmlwcGV0fEltcG9ydC1Jc2VTbmlwcGV0fE5ldy1Jc2VTbmlwcGV0fFwiICtcbiAgICAgICAgLy8gTW9kdWxlIEtkc1xuICAgICAgICBcIkFkZC1LZHNSb290S2V5fENsZWFyLUtkc0NhY2hlfEdldC1LZHNDb25maWd1cmF0aW9ufEdldC1LZHNSb290S2V5fFNldC1LZHNDb25maWd1cmF0aW9ufFRlc3QtS2RzUm9vdEtleXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBNaWNyb3NvZnQuUG93ZXJTaGVsbC5BcmNoaXZlXG4gICAgICAgIFwiQ29tcHJlc3MtQXJjaGl2ZXxFeHBhbmQtQXJjaGl2ZXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBNaWNyb3NvZnQuUG93ZXJTaGVsbC5EaWFnbm9zdGljc1xuICAgICAgICBcIkV4cG9ydC1Db3VudGVyfEdldC1Db3VudGVyfEdldC1XaW5FdmVudHxJbXBvcnQtQ291bnRlcnxOZXctV2luRXZlbnR8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgTWljcm9zb2Z0LlBvd2VyU2hlbGwuSG9zdFxuICAgICAgICBcIlN0YXJ0LVRyYW5zY3JpcHR8U3RvcC1UcmFuc2NyaXB0fFwiICtcbiAgICAgICAgLy8gTW9kdWxlIE1pY3Jvc29mdC5Qb3dlclNoZWxsLk1hbmFnZW1lbnRcbiAgICAgICAgXCJBZGQtQ29tcHV0ZXJ8QWRkLUNvbnRlbnR8Q2hlY2twb2ludC1Db21wdXRlcnxDbGVhci1Db250ZW50fENsZWFyLUV2ZW50TG9nfENsZWFyLUl0ZW18Q2xlYXItSXRlbVByb3BlcnR5fENsZWFyLVJlY3ljbGVCaW58Q29tcGxldGUtVHJhbnNhY3Rpb258Q29udmVydC1QYXRofENvcHktSXRlbXxDb3B5LUl0ZW1Qcm9wZXJ0eXxEZWJ1Zy1Qcm9jZXNzfERpc2FibGUtQ29tcHV0ZXJSZXN0b3JlfEVuYWJsZS1Db21wdXRlclJlc3RvcmV8R2V0LUNoaWxkSXRlbXxHZXQtQ2xpcGJvYXJkfEdldC1Db21wdXRlclJlc3RvcmVQb2ludHxHZXQtQ29udGVudHxHZXQtQ29udHJvbFBhbmVsSXRlbXxHZXQtRXZlbnRMb2d8R2V0LUhvdEZpeHxHZXQtSXRlbXxHZXQtSXRlbVByb3BlcnR5fEdldC1JdGVtUHJvcGVydHlWYWx1ZXxHZXQtTG9jYXRpb258R2V0LVByb2Nlc3N8R2V0LVBTRHJpdmV8R2V0LVBTUHJvdmlkZXJ8R2V0LVNlcnZpY2V8R2V0LVRyYW5zYWN0aW9ufEdldC1XbWlPYmplY3R8SW52b2tlLUl0ZW18SW52b2tlLVdtaU1ldGhvZHxKb2luLVBhdGh8TGltaXQtRXZlbnRMb2d8TW92ZS1JdGVtfE1vdmUtSXRlbVByb3BlcnR5fE5ldy1FdmVudExvZ3xOZXctSXRlbXxOZXctSXRlbVByb3BlcnR5fE5ldy1QU0RyaXZlfE5ldy1TZXJ2aWNlfE5ldy1XZWJTZXJ2aWNlUHJveHl8UG9wLUxvY2F0aW9ufFB1c2gtTG9jYXRpb258UmVnaXN0ZXItV21pRXZlbnR8UmVtb3ZlLUNvbXB1dGVyfFJlbW92ZS1FdmVudExvZ3xSZW1vdmUtSXRlbXxSZW1vdmUtSXRlbVByb3BlcnR5fFJlbW92ZS1QU0RyaXZlfFJlbW92ZS1XbWlPYmplY3R8UmVuYW1lLUNvbXB1dGVyfFJlbmFtZS1JdGVtfFJlbmFtZS1JdGVtUHJvcGVydHl8UmVzZXQtQ29tcHV0ZXJNYWNoaW5lUGFzc3dvcmR8UmVzb2x2ZS1QYXRofFJlc3RhcnQtQ29tcHV0ZXJ8UmVzdGFydC1TZXJ2aWNlfFJlc3RvcmUtQ29tcHV0ZXJ8UmVzdW1lLVNlcnZpY2V8U2V0LUNsaXBib2FyZHxTZXQtQ29udGVudHxTZXQtSXRlbXxTZXQtSXRlbVByb3BlcnR5fFNldC1Mb2NhdGlvbnxTZXQtU2VydmljZXxTZXQtV21pSW5zdGFuY2V8U2hvdy1Db250cm9sUGFuZWxJdGVtfFNob3ctRXZlbnRMb2d8U3BsaXQtUGF0aHxTdGFydC1Qcm9jZXNzfFN0YXJ0LVNlcnZpY2V8U3RhcnQtVHJhbnNhY3Rpb258U3RvcC1Db21wdXRlcnxTdG9wLVByb2Nlc3N8U3RvcC1TZXJ2aWNlfFN1c3BlbmQtU2VydmljZXxUZXN0LUNvbXB1dGVyU2VjdXJlQ2hhbm5lbHxUZXN0LUNvbm5lY3Rpb258VGVzdC1QYXRofFVuZG8tVHJhbnNhY3Rpb258VXNlLVRyYW5zYWN0aW9ufFdhaXQtUHJvY2Vzc3xXcml0ZS1FdmVudExvZ3xcIiArXG4gICAgICAgIC8vIE1vZHVsZSBNaWNyb3NvZnQuUG93ZXJTaGVsbC5PRGF0YVV0aWxzXG4gICAgICAgIFwiRXhwb3J0LU9EYXRhRW5kcG9pbnRQcm94eXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBNaWNyb3NvZnQuUG93ZXJTaGVsbC5TZWN1cml0eVxuICAgICAgICBcIkNvbnZlcnRGcm9tLVNlY3VyZVN0cmluZ3xDb252ZXJ0VG8tU2VjdXJlU3RyaW5nfEdldC1BY2x8R2V0LUF1dGhlbnRpY29kZVNpZ25hdHVyZXxHZXQtQ21zTWVzc2FnZXxHZXQtQ3JlZGVudGlhbHxHZXQtRXhlY3V0aW9uUG9saWN5fEdldC1QZnhDZXJ0aWZpY2F0ZXxQcm90ZWN0LUNtc01lc3NhZ2V8U2V0LUFjbHxTZXQtQXV0aGVudGljb2RlU2lnbmF0dXJlfFNldC1FeGVjdXRpb25Qb2xpY3l8VW5wcm90ZWN0LUNtc01lc3NhZ2V8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgTWljcm9zb2Z0LlBvd2VyU2hlbGwuVXRpbGl0eVxuICAgICAgICBcIkNvbnZlcnRGcm9tLVNkZGxTdHJpbmd8Rm9ybWF0LUhleHxHZXQtRmlsZUhhc2h8SW1wb3J0LVBvd2VyU2hlbGxEYXRhRmlsZXxOZXctR3VpZHxOZXctVGVtcG9yYXJ5RmlsZXxBZGQtTWVtYmVyfEFkZC1UeXBlfENsZWFyLVZhcmlhYmxlfENvbXBhcmUtT2JqZWN0fENvbnZlcnRGcm9tLUNzdnxDb252ZXJ0RnJvbS1Kc29ufENvbnZlcnRGcm9tLVN0cmluZ3xDb252ZXJ0RnJvbS1TdHJpbmdEYXRhfENvbnZlcnQtU3RyaW5nfENvbnZlcnRUby1Dc3Z8Q29udmVydFRvLUh0bWx8Q29udmVydFRvLUpzb258Q29udmVydFRvLVhtbHxEZWJ1Zy1SdW5zcGFjZXxEaXNhYmxlLVBTQnJlYWtwb2ludHxEaXNhYmxlLVJ1bnNwYWNlRGVidWd8RW5hYmxlLVBTQnJlYWtwb2ludHxFbmFibGUtUnVuc3BhY2VEZWJ1Z3xFeHBvcnQtQWxpYXN8RXhwb3J0LUNsaXhtbHxFeHBvcnQtQ3N2fEV4cG9ydC1Gb3JtYXREYXRhfEV4cG9ydC1QU1Nlc3Npb258Rm9ybWF0LUN1c3RvbXxGb3JtYXQtTGlzdHxGb3JtYXQtVGFibGV8Rm9ybWF0LVdpZGV8R2V0LUFsaWFzfEdldC1DdWx0dXJlfEdldC1EYXRlfEdldC1FdmVudHxHZXQtRXZlbnRTdWJzY3JpYmVyfEdldC1Gb3JtYXREYXRhfEdldC1Ib3N0fEdldC1NZW1iZXJ8R2V0LVBTQnJlYWtwb2ludHxHZXQtUFNDYWxsU3RhY2t8R2V0LVJhbmRvbXxHZXQtUnVuc3BhY2V8R2V0LVJ1bnNwYWNlRGVidWd8R2V0LVRyYWNlU291cmNlfEdldC1UeXBlRGF0YXxHZXQtVUlDdWx0dXJlfEdldC1VbmlxdWV8R2V0LVZhcmlhYmxlfEdyb3VwLU9iamVjdHxJbXBvcnQtQWxpYXN8SW1wb3J0LUNsaXhtbHxJbXBvcnQtQ3N2fEltcG9ydC1Mb2NhbGl6ZWREYXRhfEltcG9ydC1QU1Nlc3Npb258SW52b2tlLUV4cHJlc3Npb258SW52b2tlLVJlc3RNZXRob2R8SW52b2tlLVdlYlJlcXVlc3R8TWVhc3VyZS1Db21tYW5kfE1lYXN1cmUtT2JqZWN0fE5ldy1BbGlhc3xOZXctRXZlbnR8TmV3LU9iamVjdHxOZXctVGltZVNwYW58TmV3LVZhcmlhYmxlfE91dC1GaWxlfE91dC1HcmlkVmlld3xPdXQtUHJpbnRlcnxPdXQtU3RyaW5nfFJlYWQtSG9zdHxSZWdpc3Rlci1FbmdpbmVFdmVudHxSZWdpc3Rlci1PYmplY3RFdmVudHxSZW1vdmUtRXZlbnR8UmVtb3ZlLVBTQnJlYWtwb2ludHxSZW1vdmUtVHlwZURhdGF8UmVtb3ZlLVZhcmlhYmxlfFNlbGVjdC1PYmplY3R8U2VsZWN0LVN0cmluZ3xTZWxlY3QtWG1sfFNlbmQtTWFpbE1lc3NhZ2V8U2V0LUFsaWFzfFNldC1EYXRlfFNldC1QU0JyZWFrcG9pbnR8U2V0LVRyYWNlU291cmNlfFNldC1WYXJpYWJsZXxTaG93LUNvbW1hbmR8U29ydC1PYmplY3R8U3RhcnQtU2xlZXB8VGVlLU9iamVjdHxUcmFjZS1Db21tYW5kfFVuYmxvY2stRmlsZXxVbnJlZ2lzdGVyLUV2ZW50fFVwZGF0ZS1Gb3JtYXREYXRhfFVwZGF0ZS1MaXN0fFVwZGF0ZS1UeXBlRGF0YXxXYWl0LURlYnVnZ2VyfFdhaXQtRXZlbnR8V3JpdGUtRGVidWd8V3JpdGUtRXJyb3J8V3JpdGUtSG9zdHxXcml0ZS1JbmZvcm1hdGlvbnxXcml0ZS1PdXRwdXR8V3JpdGUtUHJvZ3Jlc3N8V3JpdGUtVmVyYm9zZXxXcml0ZS1XYXJuaW5nfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIE1pY3Jvc29mdC5XU01hbi5NYW5hZ2VtZW50XG4gICAgICAgIFwiQ29ubmVjdC1XU01hbnxEaXNhYmxlLVdTTWFuQ3JlZFNTUHxEaXNjb25uZWN0LVdTTWFufEVuYWJsZS1XU01hbkNyZWRTU1B8R2V0LVdTTWFuQ3JlZFNTUHxHZXQtV1NNYW5JbnN0YW5jZXxJbnZva2UtV1NNYW5BY3Rpb258TmV3LVdTTWFuSW5zdGFuY2V8TmV3LVdTTWFuU2Vzc2lvbk9wdGlvbnxSZW1vdmUtV1NNYW5JbnN0YW5jZXxTZXQtV1NNYW5JbnN0YW5jZXxTZXQtV1NNYW5RdWlja0NvbmZpZ3xUZXN0LVdTTWFufFwiICtcbiAgICAgICAgLy8gTW9kdWxlIE1NQWdlbnRcbiAgICAgICAgXCJEZWJ1Zy1NTUFwcFByZWxhdW5jaHxEaXNhYmxlLU1NQWdlbnR8RW5hYmxlLU1NQWdlbnR8R2V0LU1NQWdlbnR8U2V0LU1NQWdlbnR8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgTXNEdGNcbiAgICAgICAgXCJBZGQtRHRjQ2x1c3RlclRNTWFwcGluZ3xHZXQtRHRjfEdldC1EdGNBZHZhbmNlZEhvc3RTZXR0aW5nfEdldC1EdGNBZHZhbmNlZFNldHRpbmd8R2V0LUR0Y0NsdXN0ZXJEZWZhdWx0fEdldC1EdGNDbHVzdGVyVE1NYXBwaW5nfEdldC1EdGNEZWZhdWx0fEdldC1EdGNMb2d8R2V0LUR0Y05ldHdvcmtTZXR0aW5nfEdldC1EdGNUcmFuc2FjdGlvbnxHZXQtRHRjVHJhbnNhY3Rpb25zU3RhdGlzdGljc3xHZXQtRHRjVHJhbnNhY3Rpb25zVHJhY2VTZXNzaW9ufEdldC1EdGNUcmFuc2FjdGlvbnNUcmFjZVNldHRpbmd8SW5zdGFsbC1EdGN8UmVtb3ZlLUR0Y0NsdXN0ZXJUTU1hcHBpbmd8UmVzZXQtRHRjTG9nfFNldC1EdGNBZHZhbmNlZEhvc3RTZXR0aW5nfFNldC1EdGNBZHZhbmNlZFNldHRpbmd8U2V0LUR0Y0NsdXN0ZXJEZWZhdWx0fFNldC1EdGNDbHVzdGVyVE1NYXBwaW5nfFNldC1EdGNEZWZhdWx0fFNldC1EdGNMb2d8U2V0LUR0Y05ldHdvcmtTZXR0aW5nfFNldC1EdGNUcmFuc2FjdGlvbnxTZXQtRHRjVHJhbnNhY3Rpb25zVHJhY2VTZXNzaW9ufFNldC1EdGNUcmFuc2FjdGlvbnNUcmFjZVNldHRpbmd8U3RhcnQtRHRjfFN0YXJ0LUR0Y1RyYW5zYWN0aW9uc1RyYWNlU2Vzc2lvbnxTdG9wLUR0Y3xTdG9wLUR0Y1RyYW5zYWN0aW9uc1RyYWNlU2Vzc2lvbnxUZXN0LUR0Y3xVbmluc3RhbGwtRHRjfFdyaXRlLUR0Y1RyYW5zYWN0aW9uc1RyYWNlU2Vzc2lvbnxDb21wbGV0ZS1EdGNEaWFnbm9zdGljVHJhbnNhY3Rpb258Sm9pbi1EdGNEaWFnbm9zdGljUmVzb3VyY2VNYW5hZ2VyfE5ldy1EdGNEaWFnbm9zdGljVHJhbnNhY3Rpb258UmVjZWl2ZS1EdGNEaWFnbm9zdGljVHJhbnNhY3Rpb258U2VuZC1EdGNEaWFnbm9zdGljVHJhbnNhY3Rpb258U3RhcnQtRHRjRGlhZ25vc3RpY1Jlc291cmNlTWFuYWdlcnxTdG9wLUR0Y0RpYWdub3N0aWNSZXNvdXJjZU1hbmFnZXJ8VW5kby1EdGNEaWFnbm9zdGljVHJhbnNhY3Rpb258XCIgK1xuICAgICAgICAvLyBNb2R1bGUgTmV0QWRhcHRlclxuICAgICAgICBcIkRpc2FibGUtTmV0QWRhcHRlcnxEaXNhYmxlLU5ldEFkYXB0ZXJCaW5kaW5nfERpc2FibGUtTmV0QWRhcHRlckNoZWNrc3VtT2ZmbG9hZHxEaXNhYmxlLU5ldEFkYXB0ZXJFbmNhcHN1bGF0ZWRQYWNrZXRUYXNrT2ZmbG9hZHxEaXNhYmxlLU5ldEFkYXB0ZXJJUHNlY09mZmxvYWR8RGlzYWJsZS1OZXRBZGFwdGVyTHNvfERpc2FibGUtTmV0QWRhcHRlclBhY2tldERpcmVjdHxEaXNhYmxlLU5ldEFkYXB0ZXJQb3dlck1hbmFnZW1lbnR8RGlzYWJsZS1OZXRBZGFwdGVyUW9zfERpc2FibGUtTmV0QWRhcHRlclJkbWF8RGlzYWJsZS1OZXRBZGFwdGVyUnNjfERpc2FibGUtTmV0QWRhcHRlclJzc3xEaXNhYmxlLU5ldEFkYXB0ZXJTcmlvdnxEaXNhYmxlLU5ldEFkYXB0ZXJWbXF8RW5hYmxlLU5ldEFkYXB0ZXJ8RW5hYmxlLU5ldEFkYXB0ZXJCaW5kaW5nfEVuYWJsZS1OZXRBZGFwdGVyQ2hlY2tzdW1PZmZsb2FkfEVuYWJsZS1OZXRBZGFwdGVyRW5jYXBzdWxhdGVkUGFja2V0VGFza09mZmxvYWR8RW5hYmxlLU5ldEFkYXB0ZXJJUHNlY09mZmxvYWR8RW5hYmxlLU5ldEFkYXB0ZXJMc298RW5hYmxlLU5ldEFkYXB0ZXJQYWNrZXREaXJlY3R8RW5hYmxlLU5ldEFkYXB0ZXJQb3dlck1hbmFnZW1lbnR8RW5hYmxlLU5ldEFkYXB0ZXJRb3N8RW5hYmxlLU5ldEFkYXB0ZXJSZG1hfEVuYWJsZS1OZXRBZGFwdGVyUnNjfEVuYWJsZS1OZXRBZGFwdGVyUnNzfEVuYWJsZS1OZXRBZGFwdGVyU3Jpb3Z8RW5hYmxlLU5ldEFkYXB0ZXJWbXF8R2V0LU5ldEFkYXB0ZXJ8R2V0LU5ldEFkYXB0ZXJBZHZhbmNlZFByb3BlcnR5fEdldC1OZXRBZGFwdGVyQmluZGluZ3xHZXQtTmV0QWRhcHRlckNoZWNrc3VtT2ZmbG9hZHxHZXQtTmV0QWRhcHRlckVuY2Fwc3VsYXRlZFBhY2tldFRhc2tPZmZsb2FkfEdldC1OZXRBZGFwdGVySGFyZHdhcmVJbmZvfEdldC1OZXRBZGFwdGVySVBzZWNPZmZsb2FkfEdldC1OZXRBZGFwdGVyTHNvfEdldC1OZXRBZGFwdGVyUGFja2V0RGlyZWN0fEdldC1OZXRBZGFwdGVyUG93ZXJNYW5hZ2VtZW50fEdldC1OZXRBZGFwdGVyUW9zfEdldC1OZXRBZGFwdGVyUmRtYXxHZXQtTmV0QWRhcHRlclJzY3xHZXQtTmV0QWRhcHRlclJzc3xHZXQtTmV0QWRhcHRlclNyaW92fEdldC1OZXRBZGFwdGVyU3Jpb3ZWZnxHZXQtTmV0QWRhcHRlclN0YXRpc3RpY3N8R2V0LU5ldEFkYXB0ZXJWbXF8R2V0LU5ldEFkYXB0ZXJWbXFRdWV1ZXxHZXQtTmV0QWRhcHRlclZQb3J0fE5ldy1OZXRBZGFwdGVyQWR2YW5jZWRQcm9wZXJ0eXxSZW1vdmUtTmV0QWRhcHRlckFkdmFuY2VkUHJvcGVydHl8UmVuYW1lLU5ldEFkYXB0ZXJ8UmVzZXQtTmV0QWRhcHRlckFkdmFuY2VkUHJvcGVydHl8UmVzdGFydC1OZXRBZGFwdGVyfFNldC1OZXRBZGFwdGVyfFNldC1OZXRBZGFwdGVyQWR2YW5jZWRQcm9wZXJ0eXxTZXQtTmV0QWRhcHRlckJpbmRpbmd8U2V0LU5ldEFkYXB0ZXJDaGVja3N1bU9mZmxvYWR8U2V0LU5ldEFkYXB0ZXJFbmNhcHN1bGF0ZWRQYWNrZXRUYXNrT2ZmbG9hZHxTZXQtTmV0QWRhcHRlcklQc2VjT2ZmbG9hZHxTZXQtTmV0QWRhcHRlckxzb3xTZXQtTmV0QWRhcHRlclBhY2tldERpcmVjdHxTZXQtTmV0QWRhcHRlclBvd2VyTWFuYWdlbWVudHxTZXQtTmV0QWRhcHRlclFvc3xTZXQtTmV0QWRhcHRlclJkbWF8U2V0LU5ldEFkYXB0ZXJSc2N8U2V0LU5ldEFkYXB0ZXJSc3N8U2V0LU5ldEFkYXB0ZXJTcmlvdnxTZXQtTmV0QWRhcHRlclZtcXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBOZXRDb25uZWN0aW9uXG4gICAgICAgIFwiR2V0LU5ldENvbm5lY3Rpb25Qcm9maWxlfFNldC1OZXRDb25uZWN0aW9uUHJvZmlsZXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBOZXRFdmVudFBhY2tldENhcHR1cmVcbiAgICAgICAgXCJBZGQtTmV0RXZlbnROZXR3b3JrQWRhcHRlcnxBZGQtTmV0RXZlbnRQYWNrZXRDYXB0dXJlUHJvdmlkZXJ8QWRkLU5ldEV2ZW50UHJvdmlkZXJ8QWRkLU5ldEV2ZW50Vm1OZXR3b3JrQWRhcHRlcnxBZGQtTmV0RXZlbnRWbVN3aXRjaHxBZGQtTmV0RXZlbnRXRlBDYXB0dXJlUHJvdmlkZXJ8R2V0LU5ldEV2ZW50TmV0d29ya0FkYXB0ZXJ8R2V0LU5ldEV2ZW50UGFja2V0Q2FwdHVyZVByb3ZpZGVyfEdldC1OZXRFdmVudFByb3ZpZGVyfEdldC1OZXRFdmVudFNlc3Npb258R2V0LU5ldEV2ZW50Vm1OZXR3b3JrQWRhcHRlcnxHZXQtTmV0RXZlbnRWbVN3aXRjaHxHZXQtTmV0RXZlbnRXRlBDYXB0dXJlUHJvdmlkZXJ8TmV3LU5ldEV2ZW50U2Vzc2lvbnxSZW1vdmUtTmV0RXZlbnROZXR3b3JrQWRhcHRlcnxSZW1vdmUtTmV0RXZlbnRQYWNrZXRDYXB0dXJlUHJvdmlkZXJ8UmVtb3ZlLU5ldEV2ZW50UHJvdmlkZXJ8UmVtb3ZlLU5ldEV2ZW50U2Vzc2lvbnxSZW1vdmUtTmV0RXZlbnRWbU5ldHdvcmtBZGFwdGVyfFJlbW92ZS1OZXRFdmVudFZtU3dpdGNofFJlbW92ZS1OZXRFdmVudFdGUENhcHR1cmVQcm92aWRlcnxTZXQtTmV0RXZlbnRQYWNrZXRDYXB0dXJlUHJvdmlkZXJ8U2V0LU5ldEV2ZW50UHJvdmlkZXJ8U2V0LU5ldEV2ZW50U2Vzc2lvbnxTZXQtTmV0RXZlbnRXRlBDYXB0dXJlUHJvdmlkZXJ8U3RhcnQtTmV0RXZlbnRTZXNzaW9ufFN0b3AtTmV0RXZlbnRTZXNzaW9ufFwiICtcbiAgICAgICAgLy8gTW9kdWxlIE5ldExiZm9cbiAgICAgICAgXCJBZGQtTmV0TGJmb1RlYW1NZW1iZXJ8QWRkLU5ldExiZm9UZWFtTmljfEdldC1OZXRMYmZvVGVhbXxHZXQtTmV0TGJmb1RlYW1NZW1iZXJ8R2V0LU5ldExiZm9UZWFtTmljfE5ldy1OZXRMYmZvVGVhbXxSZW1vdmUtTmV0TGJmb1RlYW18UmVtb3ZlLU5ldExiZm9UZWFtTWVtYmVyfFJlbW92ZS1OZXRMYmZvVGVhbU5pY3xSZW5hbWUtTmV0TGJmb1RlYW18U2V0LU5ldExiZm9UZWFtfFNldC1OZXRMYmZvVGVhbU1lbWJlcnxTZXQtTmV0TGJmb1RlYW1OaWN8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgTmV0TmF0XG4gICAgICAgIFwiQWRkLU5ldE5hdEV4dGVybmFsQWRkcmVzc3xBZGQtTmV0TmF0U3RhdGljTWFwcGluZ3xHZXQtTmV0TmF0fEdldC1OZXROYXRFeHRlcm5hbEFkZHJlc3N8R2V0LU5ldE5hdEdsb2JhbHxHZXQtTmV0TmF0U2Vzc2lvbnxHZXQtTmV0TmF0U3RhdGljTWFwcGluZ3xOZXctTmV0TmF0fFJlbW92ZS1OZXROYXR8UmVtb3ZlLU5ldE5hdEV4dGVybmFsQWRkcmVzc3xSZW1vdmUtTmV0TmF0U3RhdGljTWFwcGluZ3xTZXQtTmV0TmF0fFNldC1OZXROYXRHbG9iYWx8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgTmV0UW9zXG4gICAgICAgIFwiR2V0LU5ldFFvc1BvbGljeXxOZXctTmV0UW9zUG9saWN5fFJlbW92ZS1OZXRRb3NQb2xpY3l8U2V0LU5ldFFvc1BvbGljeXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBOZXRTZWN1cml0eVxuICAgICAgICBcIkNvcHktTmV0RmlyZXdhbGxSdWxlfENvcHktTmV0SVBzZWNNYWluTW9kZUNyeXB0b1NldHxDb3B5LU5ldElQc2VjTWFpbk1vZGVSdWxlfENvcHktTmV0SVBzZWNQaGFzZTFBdXRoU2V0fENvcHktTmV0SVBzZWNQaGFzZTJBdXRoU2V0fENvcHktTmV0SVBzZWNRdWlja01vZGVDcnlwdG9TZXR8Q29weS1OZXRJUHNlY1J1bGV8RGlzYWJsZS1OZXRGaXJld2FsbFJ1bGV8RGlzYWJsZS1OZXRJUHNlY01haW5Nb2RlUnVsZXxEaXNhYmxlLU5ldElQc2VjUnVsZXxFbmFibGUtTmV0RmlyZXdhbGxSdWxlfEVuYWJsZS1OZXRJUHNlY01haW5Nb2RlUnVsZXxFbmFibGUtTmV0SVBzZWNSdWxlfEZpbmQtTmV0SVBzZWNSdWxlfEdldC1OZXRGaXJld2FsbEFkZHJlc3NGaWx0ZXJ8R2V0LU5ldEZpcmV3YWxsQXBwbGljYXRpb25GaWx0ZXJ8R2V0LU5ldEZpcmV3YWxsSW50ZXJmYWNlRmlsdGVyfEdldC1OZXRGaXJld2FsbEludGVyZmFjZVR5cGVGaWx0ZXJ8R2V0LU5ldEZpcmV3YWxsUG9ydEZpbHRlcnxHZXQtTmV0RmlyZXdhbGxQcm9maWxlfEdldC1OZXRGaXJld2FsbFJ1bGV8R2V0LU5ldEZpcmV3YWxsU2VjdXJpdHlGaWx0ZXJ8R2V0LU5ldEZpcmV3YWxsU2VydmljZUZpbHRlcnxHZXQtTmV0RmlyZXdhbGxTZXR0aW5nfEdldC1OZXRJUHNlY0Rvc3BTZXR0aW5nfEdldC1OZXRJUHNlY01haW5Nb2RlQ3J5cHRvU2V0fEdldC1OZXRJUHNlY01haW5Nb2RlUnVsZXxHZXQtTmV0SVBzZWNNYWluTW9kZVNBfEdldC1OZXRJUHNlY1BoYXNlMUF1dGhTZXR8R2V0LU5ldElQc2VjUGhhc2UyQXV0aFNldHxHZXQtTmV0SVBzZWNRdWlja01vZGVDcnlwdG9TZXR8R2V0LU5ldElQc2VjUXVpY2tNb2RlU0F8R2V0LU5ldElQc2VjUnVsZXxOZXctTmV0RmlyZXdhbGxSdWxlfE5ldy1OZXRJUHNlY0Rvc3BTZXR0aW5nfE5ldy1OZXRJUHNlY01haW5Nb2RlQ3J5cHRvU2V0fE5ldy1OZXRJUHNlY01haW5Nb2RlUnVsZXxOZXctTmV0SVBzZWNQaGFzZTFBdXRoU2V0fE5ldy1OZXRJUHNlY1BoYXNlMkF1dGhTZXR8TmV3LU5ldElQc2VjUXVpY2tNb2RlQ3J5cHRvU2V0fE5ldy1OZXRJUHNlY1J1bGV8T3Blbi1OZXRHUE98UmVtb3ZlLU5ldEZpcmV3YWxsUnVsZXxSZW1vdmUtTmV0SVBzZWNEb3NwU2V0dGluZ3xSZW1vdmUtTmV0SVBzZWNNYWluTW9kZUNyeXB0b1NldHxSZW1vdmUtTmV0SVBzZWNNYWluTW9kZVJ1bGV8UmVtb3ZlLU5ldElQc2VjTWFpbk1vZGVTQXxSZW1vdmUtTmV0SVBzZWNQaGFzZTFBdXRoU2V0fFJlbW92ZS1OZXRJUHNlY1BoYXNlMkF1dGhTZXR8UmVtb3ZlLU5ldElQc2VjUXVpY2tNb2RlQ3J5cHRvU2V0fFJlbW92ZS1OZXRJUHNlY1F1aWNrTW9kZVNBfFJlbW92ZS1OZXRJUHNlY1J1bGV8UmVuYW1lLU5ldEZpcmV3YWxsUnVsZXxSZW5hbWUtTmV0SVBzZWNNYWluTW9kZUNyeXB0b1NldHxSZW5hbWUtTmV0SVBzZWNNYWluTW9kZVJ1bGV8UmVuYW1lLU5ldElQc2VjUGhhc2UxQXV0aFNldHxSZW5hbWUtTmV0SVBzZWNQaGFzZTJBdXRoU2V0fFJlbmFtZS1OZXRJUHNlY1F1aWNrTW9kZUNyeXB0b1NldHxSZW5hbWUtTmV0SVBzZWNSdWxlfFNhdmUtTmV0R1BPfFNldC1OZXRGaXJld2FsbEFkZHJlc3NGaWx0ZXJ8U2V0LU5ldEZpcmV3YWxsQXBwbGljYXRpb25GaWx0ZXJ8U2V0LU5ldEZpcmV3YWxsSW50ZXJmYWNlRmlsdGVyfFNldC1OZXRGaXJld2FsbEludGVyZmFjZVR5cGVGaWx0ZXJ8U2V0LU5ldEZpcmV3YWxsUG9ydEZpbHRlcnxTZXQtTmV0RmlyZXdhbGxQcm9maWxlfFNldC1OZXRGaXJld2FsbFJ1bGV8U2V0LU5ldEZpcmV3YWxsU2VjdXJpdHlGaWx0ZXJ8U2V0LU5ldEZpcmV3YWxsU2VydmljZUZpbHRlcnxTZXQtTmV0RmlyZXdhbGxTZXR0aW5nfFNldC1OZXRJUHNlY0Rvc3BTZXR0aW5nfFNldC1OZXRJUHNlY01haW5Nb2RlQ3J5cHRvU2V0fFNldC1OZXRJUHNlY01haW5Nb2RlUnVsZXxTZXQtTmV0SVBzZWNQaGFzZTFBdXRoU2V0fFNldC1OZXRJUHNlY1BoYXNlMkF1dGhTZXR8U2V0LU5ldElQc2VjUXVpY2tNb2RlQ3J5cHRvU2V0fFNldC1OZXRJUHNlY1J1bGV8U2hvdy1OZXRGaXJld2FsbFJ1bGV8U2hvdy1OZXRJUHNlY1J1bGV8U3luYy1OZXRJUHNlY1J1bGV8VXBkYXRlLU5ldElQc2VjUnVsZXxHZXQtREFQb2xpY3lDaGFuZ2V8TmV3LU5ldElQc2VjQXV0aFByb3Bvc2FsfE5ldy1OZXRJUHNlY01haW5Nb2RlQ3J5cHRvUHJvcG9zYWx8TmV3LU5ldElQc2VjUXVpY2tNb2RlQ3J5cHRvUHJvcG9zYWx8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgTmV0U3dpdGNoVGVhbVxuICAgICAgICBcIkFkZC1OZXRTd2l0Y2hUZWFtTWVtYmVyfEdldC1OZXRTd2l0Y2hUZWFtfEdldC1OZXRTd2l0Y2hUZWFtTWVtYmVyfE5ldy1OZXRTd2l0Y2hUZWFtfFJlbW92ZS1OZXRTd2l0Y2hUZWFtfFJlbW92ZS1OZXRTd2l0Y2hUZWFtTWVtYmVyfFJlbmFtZS1OZXRTd2l0Y2hUZWFtfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIE5ldFRDUElQXG4gICAgICAgIFwiRmluZC1OZXRSb3V0ZXxHZXQtTmV0Q29tcGFydG1lbnR8R2V0LU5ldElQQWRkcmVzc3xHZXQtTmV0SVBDb25maWd1cmF0aW9ufEdldC1OZXRJUEludGVyZmFjZXxHZXQtTmV0SVB2NFByb3RvY29sfEdldC1OZXRJUHY2UHJvdG9jb2x8R2V0LU5ldE5laWdoYm9yfEdldC1OZXRPZmZsb2FkR2xvYmFsU2V0dGluZ3xHZXQtTmV0UHJlZml4UG9saWN5fEdldC1OZXRSb3V0ZXxHZXQtTmV0VENQQ29ubmVjdGlvbnxHZXQtTmV0VENQU2V0dGluZ3xHZXQtTmV0VHJhbnNwb3J0RmlsdGVyfEdldC1OZXRVRFBFbmRwb2ludHxHZXQtTmV0VURQU2V0dGluZ3xOZXctTmV0SVBBZGRyZXNzfE5ldy1OZXROZWlnaGJvcnxOZXctTmV0Um91dGV8TmV3LU5ldFRyYW5zcG9ydEZpbHRlcnxSZW1vdmUtTmV0SVBBZGRyZXNzfFJlbW92ZS1OZXROZWlnaGJvcnxSZW1vdmUtTmV0Um91dGV8UmVtb3ZlLU5ldFRyYW5zcG9ydEZpbHRlcnxTZXQtTmV0SVBBZGRyZXNzfFNldC1OZXRJUEludGVyZmFjZXxTZXQtTmV0SVB2NFByb3RvY29sfFNldC1OZXRJUHY2UHJvdG9jb2x8U2V0LU5ldE5laWdoYm9yfFNldC1OZXRPZmZsb2FkR2xvYmFsU2V0dGluZ3xTZXQtTmV0Um91dGV8U2V0LU5ldFRDUFNldHRpbmd8U2V0LU5ldFVEUFNldHRpbmd8VGVzdC1OZXRDb25uZWN0aW9ufFwiICtcbiAgICAgICAgLy8gTW9kdWxlIE5ldHdvcmtDb25uZWN0aXZpdHlTdGF0dXNcbiAgICAgICAgXCJHZXQtREFDb25uZWN0aW9uU3RhdHVzfEdldC1OQ1NJUG9saWN5Q29uZmlndXJhdGlvbnxSZXNldC1OQ1NJUG9saWN5Q29uZmlndXJhdGlvbnxTZXQtTkNTSVBvbGljeUNvbmZpZ3VyYXRpb258XCIgK1xuICAgICAgICAvLyBNb2R1bGUgTmV0d29ya1N3aXRjaE1hbmFnZXJcbiAgICAgICAgXCJEaXNhYmxlLU5ldHdvcmtTd2l0Y2hFdGhlcm5ldFBvcnR8RGlzYWJsZS1OZXR3b3JrU3dpdGNoRmVhdHVyZXxEaXNhYmxlLU5ldHdvcmtTd2l0Y2hWbGFufEVuYWJsZS1OZXR3b3JrU3dpdGNoRXRoZXJuZXRQb3J0fEVuYWJsZS1OZXR3b3JrU3dpdGNoRmVhdHVyZXxFbmFibGUtTmV0d29ya1N3aXRjaFZsYW58R2V0LU5ldHdvcmtTd2l0Y2hFdGhlcm5ldFBvcnR8R2V0LU5ldHdvcmtTd2l0Y2hGZWF0dXJlfEdldC1OZXR3b3JrU3dpdGNoR2xvYmFsRGF0YXxHZXQtTmV0d29ya1N3aXRjaFZsYW58TmV3LU5ldHdvcmtTd2l0Y2hWbGFufFJlbW92ZS1OZXR3b3JrU3dpdGNoRXRoZXJuZXRQb3J0SVBBZGRyZXNzfFJlbW92ZS1OZXR3b3JrU3dpdGNoVmxhbnxSZXN0b3JlLU5ldHdvcmtTd2l0Y2hDb25maWd1cmF0aW9ufFNhdmUtTmV0d29ya1N3aXRjaENvbmZpZ3VyYXRpb258U2V0LU5ldHdvcmtTd2l0Y2hFdGhlcm5ldFBvcnRJUEFkZHJlc3N8U2V0LU5ldHdvcmtTd2l0Y2hQb3J0TW9kZXxTZXQtTmV0d29ya1N3aXRjaFBvcnRQcm9wZXJ0eXxTZXQtTmV0d29ya1N3aXRjaFZsYW5Qcm9wZXJ0eXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBOZXR3b3JrVHJhbnNpdGlvblxuICAgICAgICBcIkFkZC1OZXRJUEh0dHBzQ2VydEJpbmRpbmd8RGlzYWJsZS1OZXREbnNUcmFuc2l0aW9uQ29uZmlndXJhdGlvbnxEaXNhYmxlLU5ldElQSHR0cHNQcm9maWxlfERpc2FibGUtTmV0TmF0VHJhbnNpdGlvbkNvbmZpZ3VyYXRpb258RW5hYmxlLU5ldERuc1RyYW5zaXRpb25Db25maWd1cmF0aW9ufEVuYWJsZS1OZXRJUEh0dHBzUHJvZmlsZXxFbmFibGUtTmV0TmF0VHJhbnNpdGlvbkNvbmZpZ3VyYXRpb258R2V0LU5ldDZ0bzRDb25maWd1cmF0aW9ufEdldC1OZXREbnNUcmFuc2l0aW9uQ29uZmlndXJhdGlvbnxHZXQtTmV0RG5zVHJhbnNpdGlvbk1vbml0b3Jpbmd8R2V0LU5ldElQSHR0cHNDb25maWd1cmF0aW9ufEdldC1OZXRJUEh0dHBzU3RhdGV8R2V0LU5ldElzYXRhcENvbmZpZ3VyYXRpb258R2V0LU5ldE5hdFRyYW5zaXRpb25Db25maWd1cmF0aW9ufEdldC1OZXROYXRUcmFuc2l0aW9uTW9uaXRvcmluZ3xHZXQtTmV0VGVyZWRvQ29uZmlndXJhdGlvbnxHZXQtTmV0VGVyZWRvU3RhdGV8TmV3LU5ldElQSHR0cHNDb25maWd1cmF0aW9ufE5ldy1OZXROYXRUcmFuc2l0aW9uQ29uZmlndXJhdGlvbnxSZW1vdmUtTmV0SVBIdHRwc0NlcnRCaW5kaW5nfFJlbW92ZS1OZXRJUEh0dHBzQ29uZmlndXJhdGlvbnxSZW1vdmUtTmV0TmF0VHJhbnNpdGlvbkNvbmZpZ3VyYXRpb258UmVuYW1lLU5ldElQSHR0cHNDb25maWd1cmF0aW9ufFJlc2V0LU5ldDZ0bzRDb25maWd1cmF0aW9ufFJlc2V0LU5ldERuc1RyYW5zaXRpb25Db25maWd1cmF0aW9ufFJlc2V0LU5ldElQSHR0cHNDb25maWd1cmF0aW9ufFJlc2V0LU5ldElzYXRhcENvbmZpZ3VyYXRpb258UmVzZXQtTmV0VGVyZWRvQ29uZmlndXJhdGlvbnxTZXQtTmV0NnRvNENvbmZpZ3VyYXRpb258U2V0LU5ldERuc1RyYW5zaXRpb25Db25maWd1cmF0aW9ufFNldC1OZXRJUEh0dHBzQ29uZmlndXJhdGlvbnxTZXQtTmV0SXNhdGFwQ29uZmlndXJhdGlvbnxTZXQtTmV0TmF0VHJhbnNpdGlvbkNvbmZpZ3VyYXRpb258U2V0LU5ldFRlcmVkb0NvbmZpZ3VyYXRpb258XCIgK1xuICAgICAgICAvLyBNb2R1bGUgUGFja2FnZU1hbmFnZW1lbnRcbiAgICAgICAgXCJGaW5kLVBhY2thZ2V8RmluZC1QYWNrYWdlUHJvdmlkZXJ8R2V0LVBhY2thZ2V8R2V0LVBhY2thZ2VQcm92aWRlcnxHZXQtUGFja2FnZVNvdXJjZXxJbXBvcnQtUGFja2FnZVByb3ZpZGVyfEluc3RhbGwtUGFja2FnZXxJbnN0YWxsLVBhY2thZ2VQcm92aWRlcnxSZWdpc3Rlci1QYWNrYWdlU291cmNlfFNhdmUtUGFja2FnZXxTZXQtUGFja2FnZVNvdXJjZXxVbmluc3RhbGwtUGFja2FnZXxVbnJlZ2lzdGVyLVBhY2thZ2VTb3VyY2V8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgUGNzdkRldmljZVxuICAgICAgICBcIkNsZWFyLVBjc3ZEZXZpY2VMb2d8R2V0LVBjc3ZEZXZpY2V8R2V0LVBjc3ZEZXZpY2VMb2d8UmVzdGFydC1QY3N2RGV2aWNlfFNldC1QY3N2RGV2aWNlQm9vdENvbmZpZ3VyYXRpb258U2V0LVBjc3ZEZXZpY2VOZXR3b3JrQ29uZmlndXJhdGlvbnxTZXQtUGNzdkRldmljZVVzZXJQYXNzd29yZHxTdGFydC1QY3N2RGV2aWNlfFN0b3AtUGNzdkRldmljZXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBQZXN0ZXJcbiAgICAgICAgXCJBZnRlckFsbHxBZnRlckVhY2h8QXNzZXJ0LU1vY2tDYWxsZWR8QXNzZXJ0LVZlcmlmaWFibGVNb2Nrc3xCZWZvcmVBbGx8QmVmb3JlRWFjaHxDb250ZXh0fERlc2NyaWJlfEdldC1Nb2NrRHluYW1pY1BhcmFtZXRlcnN8R2V0LVRlc3REcml2ZUl0ZW18SW58SW5Nb2R1bGVTY29wZXxJbnZva2UtTW9ja3xJbnZva2UtUGVzdGVyfEl0fE1vY2t8TmV3LUZpeHR1cmV8U2V0LUR5bmFtaWNQYXJhbWV0ZXJWYXJpYWJsZXN8U2V0dXB8U2hvdWxkfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIFBLSVxuICAgICAgICBcIkFkZC1DZXJ0aWZpY2F0ZUVucm9sbG1lbnRQb2xpY3lTZXJ2ZXJ8RXhwb3J0LUNlcnRpZmljYXRlfEV4cG9ydC1QZnhDZXJ0aWZpY2F0ZXxHZXQtQ2VydGlmaWNhdGV8R2V0LUNlcnRpZmljYXRlQXV0b0Vucm9sbG1lbnRQb2xpY3l8R2V0LUNlcnRpZmljYXRlRW5yb2xsbWVudFBvbGljeVNlcnZlcnxHZXQtQ2VydGlmaWNhdGVOb3RpZmljYXRpb25UYXNrfEdldC1QZnhEYXRhfEltcG9ydC1DZXJ0aWZpY2F0ZXxJbXBvcnQtUGZ4Q2VydGlmaWNhdGV8TmV3LUNlcnRpZmljYXRlTm90aWZpY2F0aW9uVGFza3xOZXctU2VsZlNpZ25lZENlcnRpZmljYXRlfFJlbW92ZS1DZXJ0aWZpY2F0ZUVucm9sbG1lbnRQb2xpY3lTZXJ2ZXJ8UmVtb3ZlLUNlcnRpZmljYXRlTm90aWZpY2F0aW9uVGFza3xTZXQtQ2VydGlmaWNhdGVBdXRvRW5yb2xsbWVudFBvbGljeXxTd2l0Y2gtQ2VydGlmaWNhdGV8VGVzdC1DZXJ0aWZpY2F0ZXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBQbnBEZXZpY2VcbiAgICAgICAgXCJEaXNhYmxlLVBucERldmljZXxFbmFibGUtUG5wRGV2aWNlfEdldC1QbnBEZXZpY2V8R2V0LVBucERldmljZVByb3BlcnR5fFwiICtcbiAgICAgICAgLy8gTW9kdWxlIFBvd2VyU2hlbGxHZXRcbiAgICAgICAgXCJGaW5kLURzY1Jlc291cmNlfEZpbmQtTW9kdWxlfEZpbmQtU2NyaXB0fEdldC1JbnN0YWxsZWRNb2R1bGV8R2V0LUluc3RhbGxlZFNjcmlwdHxHZXQtUFNSZXBvc2l0b3J5fEluc3RhbGwtTW9kdWxlfEluc3RhbGwtU2NyaXB0fE5ldy1TY3JpcHRGaWxlSW5mb3xQdWJsaXNoLU1vZHVsZXxQdWJsaXNoLVNjcmlwdHxSZWdpc3Rlci1QU1JlcG9zaXRvcnl8U2F2ZS1Nb2R1bGV8U2F2ZS1TY3JpcHR8U2V0LVBTUmVwb3NpdG9yeXxUZXN0LVNjcmlwdEZpbGVJbmZvfFVuaW5zdGFsbC1Nb2R1bGV8VW5pbnN0YWxsLVNjcmlwdHxVbnJlZ2lzdGVyLVBTUmVwb3NpdG9yeXxVcGRhdGUtTW9kdWxlfFVwZGF0ZS1Nb2R1bGVNYW5pZmVzdHxVcGRhdGUtU2NyaXB0fFVwZGF0ZS1TY3JpcHRGaWxlSW5mb3xcIiArXG4gICAgICAgIC8vIE1vZHVsZSBQcmludE1hbmFnZW1lbnRcbiAgICAgICAgXCJBZGQtUHJpbnRlcnxBZGQtUHJpbnRlckRyaXZlcnxBZGQtUHJpbnRlclBvcnR8R2V0LVByaW50Q29uZmlndXJhdGlvbnxHZXQtUHJpbnRlcnxHZXQtUHJpbnRlckRyaXZlcnxHZXQtUHJpbnRlclBvcnR8R2V0LVByaW50ZXJQcm9wZXJ0eXxHZXQtUHJpbnRKb2J8UmVhZC1QcmludGVyTmZjVGFnfFJlbW92ZS1QcmludGVyfFJlbW92ZS1QcmludGVyRHJpdmVyfFJlbW92ZS1QcmludGVyUG9ydHxSZW1vdmUtUHJpbnRKb2J8UmVuYW1lLVByaW50ZXJ8UmVzdGFydC1QcmludEpvYnxSZXN1bWUtUHJpbnRKb2J8U2V0LVByaW50Q29uZmlndXJhdGlvbnxTZXQtUHJpbnRlcnxTZXQtUHJpbnRlclByb3BlcnR5fFN1c3BlbmQtUHJpbnRKb2J8V3JpdGUtUHJpbnRlck5mY1RhZ3xcIiArXG4gICAgICAgIC8vIE1vZHVsZSBQU0Rlc2lyZWRTdGF0ZUNvbmZpZ3VyYXRpb25cbiAgICAgICAgXCJDb25maWd1cmF0aW9ufERpc2FibGUtRHNjRGVidWd8RW5hYmxlLURzY0RlYnVnfEdldC1Ec2NDb25maWd1cmF0aW9ufEdldC1Ec2NDb25maWd1cmF0aW9uU3RhdHVzfEdldC1Ec2NMb2NhbENvbmZpZ3VyYXRpb25NYW5hZ2VyfEdldC1Ec2NSZXNvdXJjZXxOZXctRHNjQ2hlY2tzdW18UmVtb3ZlLURzY0NvbmZpZ3VyYXRpb25Eb2N1bWVudHxSZXN0b3JlLURzY0NvbmZpZ3VyYXRpb258U3RvcC1Ec2NDb25maWd1cmF0aW9ufEludm9rZS1Ec2NSZXNvdXJjZXxQdWJsaXNoLURzY0NvbmZpZ3VyYXRpb258U2V0LURzY0xvY2FsQ29uZmlndXJhdGlvbk1hbmFnZXJ8U3RhcnQtRHNjQ29uZmlndXJhdGlvbnxUZXN0LURzY0NvbmZpZ3VyYXRpb258VXBkYXRlLURzY0NvbmZpZ3VyYXRpb258XCIgK1xuICAgICAgICAvLyBNb2R1bGUgUFNEaWFnbm9zdGljc1xuICAgICAgICBcIkRpc2FibGUtUFNUcmFjZXxEaXNhYmxlLVBTV1NNYW5Db21iaW5lZFRyYWNlfERpc2FibGUtV1NNYW5UcmFjZXxFbmFibGUtUFNUcmFjZXxFbmFibGUtUFNXU01hbkNvbWJpbmVkVHJhY2V8RW5hYmxlLVdTTWFuVHJhY2V8R2V0LUxvZ1Byb3BlcnRpZXN8U2V0LUxvZ1Byb3BlcnRpZXN8U3RhcnQtVHJhY2V8U3RvcC1UcmFjZXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBQU1JlYWRsaW5lXG4gICAgICAgIFwiUFNDb25zb2xlSG9zdFJlYWRsaW5lfEdldC1QU1JlYWRsaW5lS2V5SGFuZGxlcnxHZXQtUFNSZWFkbGluZU9wdGlvbnxSZW1vdmUtUFNSZWFkbGluZUtleUhhbmRsZXJ8U2V0LVBTUmVhZGxpbmVLZXlIYW5kbGVyfFNldC1QU1JlYWRsaW5lT3B0aW9ufFwiICtcbiAgICAgICAgLy8gTW9kdWxlIFBTU2NoZWR1bGVkSm9iXG4gICAgICAgIFwiQWRkLUpvYlRyaWdnZXJ8RGlzYWJsZS1Kb2JUcmlnZ2VyfERpc2FibGUtU2NoZWR1bGVkSm9ifEVuYWJsZS1Kb2JUcmlnZ2VyfEVuYWJsZS1TY2hlZHVsZWRKb2J8R2V0LUpvYlRyaWdnZXJ8R2V0LVNjaGVkdWxlZEpvYnxHZXQtU2NoZWR1bGVkSm9iT3B0aW9ufE5ldy1Kb2JUcmlnZ2VyfE5ldy1TY2hlZHVsZWRKb2JPcHRpb258UmVnaXN0ZXItU2NoZWR1bGVkSm9ifFJlbW92ZS1Kb2JUcmlnZ2VyfFNldC1Kb2JUcmlnZ2VyfFNldC1TY2hlZHVsZWRKb2J8U2V0LVNjaGVkdWxlZEpvYk9wdGlvbnxVbnJlZ2lzdGVyLVNjaGVkdWxlZEpvYnxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBQU1dvcmtmbG93XG4gICAgICAgIFwiTmV3LVBTV29ya2Zsb3dTZXNzaW9ufE5ldy1QU1dvcmtmbG93RXhlY3V0aW9uT3B0aW9ufFwiICtcbiAgICAgICAgLy8gTW9kdWxlIFBTV29ya2Zsb3dVdGlsaXR5XG4gICAgICAgIFwiSW52b2tlLUFzV29ya2Zsb3d8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgU2NoZWR1bGVkVGFza3NcbiAgICAgICAgXCJEaXNhYmxlLVNjaGVkdWxlZFRhc2t8RW5hYmxlLVNjaGVkdWxlZFRhc2t8RXhwb3J0LVNjaGVkdWxlZFRhc2t8R2V0LUNsdXN0ZXJlZFNjaGVkdWxlZFRhc2t8R2V0LVNjaGVkdWxlZFRhc2t8R2V0LVNjaGVkdWxlZFRhc2tJbmZvfE5ldy1TY2hlZHVsZWRUYXNrfE5ldy1TY2hlZHVsZWRUYXNrQWN0aW9ufE5ldy1TY2hlZHVsZWRUYXNrUHJpbmNpcGFsfE5ldy1TY2hlZHVsZWRUYXNrU2V0dGluZ3NTZXR8TmV3LVNjaGVkdWxlZFRhc2tUcmlnZ2VyfFJlZ2lzdGVyLUNsdXN0ZXJlZFNjaGVkdWxlZFRhc2t8UmVnaXN0ZXItU2NoZWR1bGVkVGFza3xTZXQtQ2x1c3RlcmVkU2NoZWR1bGVkVGFza3xTZXQtU2NoZWR1bGVkVGFza3xTdGFydC1TY2hlZHVsZWRUYXNrfFN0b3AtU2NoZWR1bGVkVGFza3xVbnJlZ2lzdGVyLUNsdXN0ZXJlZFNjaGVkdWxlZFRhc2t8VW5yZWdpc3Rlci1TY2hlZHVsZWRUYXNrfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIFNlY3VyZUJvb3RcbiAgICAgICAgXCJDb25maXJtLVNlY3VyZUJvb3RVRUZJfEZvcm1hdC1TZWN1cmVCb290VUVGSXxHZXQtU2VjdXJlQm9vdFBvbGljeXxHZXQtU2VjdXJlQm9vdFVFRkl8U2V0LVNlY3VyZUJvb3RVRUZJfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIFNtYlNoYXJlXG4gICAgICAgIFwiQmxvY2stU21iU2hhcmVBY2Nlc3N8Q2xvc2UtU21iT3BlbkZpbGV8Q2xvc2UtU21iU2Vzc2lvbnxEaXNhYmxlLVNtYkRlbGVnYXRpb258RW5hYmxlLVNtYkRlbGVnYXRpb258R2V0LVNtYkJhbmR3aWR0aExpbWl0fEdldC1TbWJDbGllbnRDb25maWd1cmF0aW9ufEdldC1TbWJDbGllbnROZXR3b3JrSW50ZXJmYWNlfEdldC1TbWJDb25uZWN0aW9ufEdldC1TbWJEZWxlZ2F0aW9ufEdldC1TbWJNYXBwaW5nfEdldC1TbWJNdWx0aWNoYW5uZWxDb25uZWN0aW9ufEdldC1TbWJNdWx0aWNoYW5uZWxDb25zdHJhaW50fEdldC1TbWJPcGVuRmlsZXxHZXQtU21iU2VydmVyQ29uZmlndXJhdGlvbnxHZXQtU21iU2VydmVyTmV0d29ya0ludGVyZmFjZXxHZXQtU21iU2Vzc2lvbnxHZXQtU21iU2hhcmV8R2V0LVNtYlNoYXJlQWNjZXNzfEdyYW50LVNtYlNoYXJlQWNjZXNzfE5ldy1TbWJNYXBwaW5nfE5ldy1TbWJNdWx0aWNoYW5uZWxDb25zdHJhaW50fE5ldy1TbWJTaGFyZXxSZW1vdmUtU21iQmFuZHdpZHRoTGltaXR8UmVtb3ZlLVNtYk1hcHBpbmd8UmVtb3ZlLVNtYk11bHRpY2hhbm5lbENvbnN0cmFpbnR8UmVtb3ZlLVNtYlNoYXJlfFJldm9rZS1TbWJTaGFyZUFjY2Vzc3xTZXQtU21iQmFuZHdpZHRoTGltaXR8U2V0LVNtYkNsaWVudENvbmZpZ3VyYXRpb258U2V0LVNtYlBhdGhBY2x8U2V0LVNtYlNlcnZlckNvbmZpZ3VyYXRpb258U2V0LVNtYlNoYXJlfFVuYmxvY2stU21iU2hhcmVBY2Nlc3N8VXBkYXRlLVNtYk11bHRpY2hhbm5lbENvbm5lY3Rpb258XCIgK1xuICAgICAgICAvLyBNb2R1bGUgU21iV2l0bmVzc1xuICAgICAgICBcIk1vdmUtU21iQ2xpZW50fEdldC1TbWJXaXRuZXNzQ2xpZW50fE1vdmUtU21iV2l0bmVzc0NsaWVudHxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBTdGFydExheW91dFxuICAgICAgICBcIkdldC1TdGFydEFwcHN8RXhwb3J0LVN0YXJ0TGF5b3V0fEltcG9ydC1TdGFydExheW91dHxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBTdG9yYWdlXG4gICAgICAgIFwiRGlzYWJsZS1QaHlzaWNhbERpc2tJbmRpY2F0aW9ufERpc2FibGUtU3RvcmFnZURpYWdub3N0aWNMb2d8RW5hYmxlLVBoeXNpY2FsRGlza0luZGljYXRpb258RW5hYmxlLVN0b3JhZ2VEaWFnbm9zdGljTG9nfEZsdXNoLVZvbHVtZXxHZXQtRGlza1NOVnxHZXQtUGh5c2ljYWxEaXNrU05WfEdldC1TdG9yYWdlRW5jbG9zdXJlU05WfEluaXRpYWxpemUtVm9sdW1lfFdyaXRlLUZpbGVTeXN0ZW1DYWNoZXxBZGQtSW5pdGlhdG9ySWRUb01hc2tpbmdTZXR8QWRkLVBhcnRpdGlvbkFjY2Vzc1BhdGh8QWRkLVBoeXNpY2FsRGlza3xBZGQtVGFyZ2V0UG9ydFRvTWFza2luZ1NldHxBZGQtVmlydHVhbERpc2tUb01hc2tpbmdTZXR8QmxvY2stRmlsZVNoYXJlQWNjZXNzfENsZWFyLURpc2t8Q2xlYXItRmlsZVN0b3JhZ2VUaWVyfENsZWFyLVN0b3JhZ2VEaWFnbm9zdGljSW5mb3xDb25uZWN0LVZpcnR1YWxEaXNrfERlYnVnLUZpbGVTaGFyZXxEZWJ1Zy1TdG9yYWdlU3ViU3lzdGVtfERlYnVnLVZvbHVtZXxEaXNhYmxlLVBoeXNpY2FsRGlza0lkZW50aWZpY2F0aW9ufERpc2FibGUtU3RvcmFnZUVuY2xvc3VyZUlkZW50aWZpY2F0aW9ufERpc2FibGUtU3RvcmFnZUhpZ2hBdmFpbGFiaWxpdHl8RGlzY29ubmVjdC1WaXJ0dWFsRGlza3xEaXNtb3VudC1EaXNrSW1hZ2V8RW5hYmxlLVBoeXNpY2FsRGlza0lkZW50aWZpY2F0aW9ufEVuYWJsZS1TdG9yYWdlRW5jbG9zdXJlSWRlbnRpZmljYXRpb258RW5hYmxlLVN0b3JhZ2VIaWdoQXZhaWxhYmlsaXR5fEZvcm1hdC1Wb2x1bWV8R2V0LURlZHVwUHJvcGVydGllc3xHZXQtRGlza3xHZXQtRGlza0ltYWdlfEdldC1EaXNrU3RvcmFnZU5vZGVWaWV3fEdldC1GaWxlSW50ZWdyaXR5fEdldC1GaWxlU2hhcmV8R2V0LUZpbGVTaGFyZUFjY2Vzc0NvbnRyb2xFbnRyeXxHZXQtRmlsZVN0b3JhZ2VUaWVyfEdldC1Jbml0aWF0b3JJZHxHZXQtSW5pdGlhdG9yUG9ydHxHZXQtTWFza2luZ1NldHxHZXQtT2ZmbG9hZERhdGFUcmFuc2ZlclNldHRpbmd8R2V0LVBhcnRpdGlvbnxHZXQtUGFydGl0aW9uU3VwcG9ydGVkU2l6ZXxHZXQtUGh5c2ljYWxEaXNrfEdldC1QaHlzaWNhbERpc2tTdG9yYWdlTm9kZVZpZXd8R2V0LVJlc2lsaWVuY3lTZXR0aW5nfEdldC1TdG9yYWdlQWR2YW5jZWRQcm9wZXJ0eXxHZXQtU3RvcmFnZURpYWdub3N0aWNJbmZvfEdldC1TdG9yYWdlRW5jbG9zdXJlfEdldC1TdG9yYWdlRW5jbG9zdXJlU3RvcmFnZU5vZGVWaWV3fEdldC1TdG9yYWdlRW5jbG9zdXJlVmVuZG9yRGF0YXxHZXQtU3RvcmFnZUZhdWx0RG9tYWlufEdldC1TdG9yYWdlRmlsZVNlcnZlcnxHZXQtU3RvcmFnZUZpcm13YXJlSW5mb3JtYXRpb258R2V0LVN0b3JhZ2VIZWFsdGhBY3Rpb258R2V0LVN0b3JhZ2VIZWFsdGhSZXBvcnR8R2V0LVN0b3JhZ2VIZWFsdGhTZXR0aW5nfEdldC1TdG9yYWdlSm9ifEdldC1TdG9yYWdlTm9kZXxHZXQtU3RvcmFnZVBvb2x8R2V0LVN0b3JhZ2VQcm92aWRlcnxHZXQtU3RvcmFnZVJlbGlhYmlsaXR5Q291bnRlcnxHZXQtU3RvcmFnZVNldHRpbmd8R2V0LVN0b3JhZ2VTdWJTeXN0ZW18R2V0LVN0b3JhZ2VUaWVyfEdldC1TdG9yYWdlVGllclN1cHBvcnRlZFNpemV8R2V0LVN1cHBvcnRlZENsdXN0ZXJTaXplc3xHZXQtU3VwcG9ydGVkRmlsZVN5c3RlbXN8R2V0LVRhcmdldFBvcnR8R2V0LVRhcmdldFBvcnRhbHxHZXQtVmlydHVhbERpc2t8R2V0LVZpcnR1YWxEaXNrU3VwcG9ydGVkU2l6ZXxHZXQtVm9sdW1lfEdldC1Wb2x1bWVDb3JydXB0aW9uQ291bnR8R2V0LVZvbHVtZVNjcnViUG9saWN5fEdyYW50LUZpbGVTaGFyZUFjY2Vzc3xIaWRlLVZpcnR1YWxEaXNrfEluaXRpYWxpemUtRGlza3xNb3VudC1EaXNrSW1hZ2V8TmV3LUZpbGVTaGFyZXxOZXctTWFza2luZ1NldHxOZXctUGFydGl0aW9ufE5ldy1TdG9yYWdlRmlsZVNlcnZlcnxOZXctU3RvcmFnZVBvb2x8TmV3LVN0b3JhZ2VTdWJzeXN0ZW1WaXJ0dWFsRGlza3xOZXctU3RvcmFnZVRpZXJ8TmV3LVZpcnR1YWxEaXNrfE5ldy1WaXJ0dWFsRGlza0Nsb25lfE5ldy1WaXJ0dWFsRGlza1NuYXBzaG90fE5ldy1Wb2x1bWV8T3B0aW1pemUtU3RvcmFnZVBvb2x8T3B0aW1pemUtVm9sdW1lfFJlZ2lzdGVyLVN0b3JhZ2VTdWJzeXN0ZW18UmVtb3ZlLUZpbGVTaGFyZXxSZW1vdmUtSW5pdGlhdG9ySWR8UmVtb3ZlLUluaXRpYXRvcklkRnJvbU1hc2tpbmdTZXR8UmVtb3ZlLU1hc2tpbmdTZXR8UmVtb3ZlLVBhcnRpdGlvbnxSZW1vdmUtUGFydGl0aW9uQWNjZXNzUGF0aHxSZW1vdmUtUGh5c2ljYWxEaXNrfFJlbW92ZS1TdG9yYWdlRmlsZVNlcnZlcnxSZW1vdmUtU3RvcmFnZUhlYWx0aFNldHRpbmd8UmVtb3ZlLVN0b3JhZ2VQb29sfFJlbW92ZS1TdG9yYWdlVGllcnxSZW1vdmUtVGFyZ2V0UG9ydEZyb21NYXNraW5nU2V0fFJlbW92ZS1WaXJ0dWFsRGlza3xSZW1vdmUtVmlydHVhbERpc2tGcm9tTWFza2luZ1NldHxSZW5hbWUtTWFza2luZ1NldHxSZXBhaXItRmlsZUludGVncml0eXxSZXBhaXItVmlydHVhbERpc2t8UmVwYWlyLVZvbHVtZXxSZXNldC1QaHlzaWNhbERpc2t8UmVzZXQtU3RvcmFnZVJlbGlhYmlsaXR5Q291bnRlcnxSZXNpemUtUGFydGl0aW9ufFJlc2l6ZS1TdG9yYWdlVGllcnxSZXNpemUtVmlydHVhbERpc2t8UmV2b2tlLUZpbGVTaGFyZUFjY2Vzc3xTZXQtRGlza3xTZXQtRmlsZUludGVncml0eXxTZXQtRmlsZVNoYXJlfFNldC1GaWxlU3RvcmFnZVRpZXJ8U2V0LUluaXRpYXRvclBvcnR8U2V0LVBhcnRpdGlvbnxTZXQtUGh5c2ljYWxEaXNrfFNldC1SZXNpbGllbmN5U2V0dGluZ3xTZXQtU3RvcmFnZUZpbGVTZXJ2ZXJ8U2V0LVN0b3JhZ2VIZWFsdGhTZXR0aW5nfFNldC1TdG9yYWdlUG9vbHxTZXQtU3RvcmFnZVByb3ZpZGVyfFNldC1TdG9yYWdlU2V0dGluZ3xTZXQtU3RvcmFnZVN1YlN5c3RlbXxTZXQtU3RvcmFnZVRpZXJ8U2V0LVZpcnR1YWxEaXNrfFNldC1Wb2x1bWV8U2V0LVZvbHVtZVNjcnViUG9saWN5fFNob3ctVmlydHVhbERpc2t8U3RhcnQtU3RvcmFnZURpYWdub3N0aWNMb2d8U3RvcC1TdG9yYWdlRGlhZ25vc3RpY0xvZ3xTdG9wLVN0b3JhZ2VKb2J8VW5ibG9jay1GaWxlU2hhcmVBY2Nlc3N8VW5yZWdpc3Rlci1TdG9yYWdlU3Vic3lzdGVtfFVwZGF0ZS1EaXNrfFVwZGF0ZS1Ib3N0U3RvcmFnZUNhY2hlfFVwZGF0ZS1TdG9yYWdlRmlybXdhcmV8VXBkYXRlLVN0b3JhZ2VQb29sfFVwZGF0ZS1TdG9yYWdlUHJvdmlkZXJDYWNoZXxXcml0ZS1Wb2x1bWVDYWNoZXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBUTFNcbiAgICAgICAgXCJEaXNhYmxlLVRsc0NpcGhlclN1aXRlfERpc2FibGUtVGxzU2Vzc2lvblRpY2tldEtleXxFbmFibGUtVGxzQ2lwaGVyU3VpdGV8RW5hYmxlLVRsc1Nlc3Npb25UaWNrZXRLZXl8RXhwb3J0LVRsc1Nlc3Npb25UaWNrZXRLZXl8R2V0LVRsc0NpcGhlclN1aXRlfE5ldy1UbHNTZXNzaW9uVGlja2V0S2V5fFwiICtcbiAgICAgICAgLy8gTW9kdWxlIFRyb3VibGVzaG9vdGluZ1BhY2tcbiAgICAgICAgXCJHZXQtVHJvdWJsZXNob290aW5nUGFja3xJbnZva2UtVHJvdWJsZXNob290aW5nUGFja3xcIiArXG4gICAgICAgIC8vIE1vZHVsZSBUcnVzdGVkUGxhdGZvcm1Nb2R1bGVcbiAgICAgICAgXCJDbGVhci1UcG18Q29udmVydFRvLVRwbU93bmVyQXV0aHxEaXNhYmxlLVRwbUF1dG9Qcm92aXNpb25pbmd8RW5hYmxlLVRwbUF1dG9Qcm92aXNpb25pbmd8R2V0LVRwbXxHZXQtVHBtRW5kb3JzZW1lbnRLZXlJbmZvfEdldC1UcG1TdXBwb3J0ZWRGZWF0dXJlfEltcG9ydC1UcG1Pd25lckF1dGh8SW5pdGlhbGl6ZS1UcG18U2V0LVRwbU93bmVyQXV0aHxVbmJsb2NrLVRwbXxcIiArXG4gICAgICAgIC8vIE1vZHVsZSBWcG5DbGllbnRcbiAgICAgICAgXCJBZGQtVnBuQ29ubmVjdGlvbnxBZGQtVnBuQ29ubmVjdGlvblJvdXRlfEFkZC1WcG5Db25uZWN0aW9uVHJpZ2dlckFwcGxpY2F0aW9ufEFkZC1WcG5Db25uZWN0aW9uVHJpZ2dlckRuc0NvbmZpZ3VyYXRpb258QWRkLVZwbkNvbm5lY3Rpb25UcmlnZ2VyVHJ1c3RlZE5ldHdvcmt8R2V0LVZwbkNvbm5lY3Rpb258R2V0LVZwbkNvbm5lY3Rpb25UcmlnZ2VyfE5ldy1FYXBDb25maWd1cmF0aW9ufE5ldy1WcG5TZXJ2ZXJBZGRyZXNzfFJlbW92ZS1WcG5Db25uZWN0aW9ufFJlbW92ZS1WcG5Db25uZWN0aW9uUm91dGV8UmVtb3ZlLVZwbkNvbm5lY3Rpb25UcmlnZ2VyQXBwbGljYXRpb258UmVtb3ZlLVZwbkNvbm5lY3Rpb25UcmlnZ2VyRG5zQ29uZmlndXJhdGlvbnxSZW1vdmUtVnBuQ29ubmVjdGlvblRyaWdnZXJUcnVzdGVkTmV0d29ya3xTZXQtVnBuQ29ubmVjdGlvbnxTZXQtVnBuQ29ubmVjdGlvbklQc2VjQ29uZmlndXJhdGlvbnxTZXQtVnBuQ29ubmVjdGlvblByb3h5fFNldC1WcG5Db25uZWN0aW9uVHJpZ2dlckRuc0NvbmZpZ3VyYXRpb258U2V0LVZwbkNvbm5lY3Rpb25UcmlnZ2VyVHJ1c3RlZE5ldHdvcmt8XCIgK1xuICAgICAgICAvLyBNb2R1bGUgV2RhY1xuICAgICAgICBcIkFkZC1PZGJjRHNufERpc2FibGUtT2RiY1BlcmZDb3VudGVyfERpc2FibGUtV2RhY0JpZFRyYWNlfEVuYWJsZS1PZGJjUGVyZkNvdW50ZXJ8RW5hYmxlLVdkYWNCaWRUcmFjZXxHZXQtT2RiY0RyaXZlcnxHZXQtT2RiY0RzbnxHZXQtT2RiY1BlcmZDb3VudGVyfEdldC1XZGFjQmlkVHJhY2V8UmVtb3ZlLU9kYmNEc258U2V0LU9kYmNEcml2ZXJ8U2V0LU9kYmNEc258XCIgK1xuICAgICAgICAvLyBNb2R1bGUgV2luZG93c0RldmVsb3BlckxpY2Vuc2VcbiAgICAgICAgXCJHZXQtV2luZG93c0RldmVsb3BlckxpY2Vuc2V8U2hvdy1XaW5kb3dzRGV2ZWxvcGVyTGljZW5zZVJlZ2lzdHJhdGlvbnxVbnJlZ2lzdGVyLVdpbmRvd3NEZXZlbG9wZXJMaWNlbnNlfFwiICtcbiAgICAgICAgLy8gTW9kdWxlIFdpbmRvd3NFcnJvclJlcG9ydGluZ1xuICAgICAgICBcIkRpc2FibGUtV2luZG93c0Vycm9yUmVwb3J0aW5nfEVuYWJsZS1XaW5kb3dzRXJyb3JSZXBvcnRpbmd8R2V0LVdpbmRvd3NFcnJvclJlcG9ydGluZ3xcIiArXG4gICAgICAgIC8vIE1vZHVsZSBXaW5kb3dzU2VhcmNoXG4gICAgICAgIFwiR2V0LVdpbmRvd3NTZWFyY2hTZXR0aW5nfFNldC1XaW5kb3dzU2VhcmNoU2V0dGluZ3xcIiArXG4gICAgICAgIC8vIE1vZHVsZSBXaW5kb3dzVXBkYXRlXG4gICAgICAgIFwiR2V0LVdpbmRvd3NVcGRhdGVMb2dcIlxuICAgICk7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBidWlsdGluRnVuY3Rpb25zLFxuICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHNcbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICAvLyBIZWxwIFJlZmVyZW5jZTogYWJvdXRfT3BlcmF0b3JzXG4gICAgLy8gaHR0cHM6Ly90ZWNobmV0Lm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9oaDg0NzczMi5hc3B4XG4gICAgdmFyIGJpbmFyeU9wZXJhdG9yc1JlID0gKFxuICAgICAgICAvLyBDb21wYXJpc29uIE9wZXJhdG9yc1xuICAgICAgICBcImVxfG5lfGd0fGx0fGxlfGdlfGxpa2V8bm90bGlrZXxtYXRjaHxub3RtYXRjaHxjb250YWluc3xub3Rjb250YWluc3xpbnxub3RpbnxiYW5kfGJvcnxieG9yfGJub3R8XCIgKyBcbiAgICAgICAgXCJjZXF8Y25lfGNndHxjbHR8Y2xlfGNnZXxjbGlrZXxjbm90bGlrZXxjbWF0Y2h8Y25vdG1hdGNofGNjb250YWluc3xjbm90Y29udGFpbnN8Y2lufGNub3RpbnxcIiArIFxuICAgICAgICBcImllcXxpbmV8aWd0fGlsdHxpbGV8aWdlfGlsaWtlfGlub3RsaWtlfGltYXRjaHxpbm90bWF0Y2h8aWNvbnRhaW5zfGlub3Rjb250YWluc3xpaW58aW5vdGlufFwiICtcbiAgICAgICAgLy8gTG9naWNhbCBPcGVyYXRvcnNcbiAgICAgICAgXCJhbmR8b3J8eG9yfG5vdHxcIiArXG4gICAgICAgIC8vIFN0cmluZyBPcGVyYXRvcnNcbiAgICAgICAgXCJzcGxpdHxqb2lufHJlcGxhY2V8ZnxcIiArXG4gICAgICAgIFwiY3NwbGl0fGNyZXBsYWNlfFwiICtcbiAgICAgICAgXCJpc3BsaXR8aXJlcGxhY2V8XCIgK1xuICAgICAgICAvLyBUeXBlIE9wZXJhdG9yc1xuICAgICAgICBcImlzfGlzbm90fGFzfFwiICtcbiAgICAgICAgLy8gU2hpZnQgT3BlcmF0b3JzXG4gICAgICAgIFwic2hsfHNoclwiXG4gICAgKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiMuKiRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjwjXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjBbeFhdWzAtOWEtZkEtRl0rXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyRdKD86W1R0XXJ1ZXxbRmZdYWxzZSlcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlskXVtObl11bGxcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlLmluc3RhbmNlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlskXVthLXpBLVpdW2EtekEtWjAtOV9dKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogVW5pY29kZSBlc2NhcGUgc2VxdWVuY2VzXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogVW5pY29kZSBpZGVudGlmaWVyc1xuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXFxcXC1dKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcLSg/OlwiICsgYmluYXJ5T3BlcmF0b3JzUmUgKyBcIilcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIEFyaXRobWV0aWMsIEFzc2lnbm1lbnQsIFJlZGlyZWN0aW9uLCBDYWxsLCBOb3QgJiBQaXBlbGluZSBPcGVyYXRvcnNcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCImfFxcXFwrfFxcXFwtfFxcXFwqfFxcXFwvfFxcXFwlfFxcXFw9fFxcXFw+fFxcXFwmfFxcXFwhfFxcXFx8XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwibHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiM+XCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJkb2MuY29tbWVudC50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXlxcXFwuXFxcXHcrXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhQb3dlcnNoZWxsSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuUG93ZXJzaGVsbEhpZ2hsaWdodFJ1bGVzID0gUG93ZXJzaGVsbEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9