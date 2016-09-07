Write-Host 'checking runtime of modules ...';

foreach ($item in Get-ChildItem $args[0] -Recurse -Include *.lib){
    $output = dumpbin /DEPENDENTS $item.FullName;
    if ($output -like '*VCRUNTIME140.dll*') {
        Write-Host "vcruntime140 found [$item]"
        Write-Host $output
    } else {
        Write-Host "vcruntime140 NOT FOUND [$item]" -ForegroundColor Red
        Write-Host $output
    }
}

