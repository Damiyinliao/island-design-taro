param(
  [Parameter(Mandatory = $true)]
  [string]$Version,

  [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Invoke-CheckedCommand {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Command,

    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$CommandArguments
  )

  & $Command @CommandArguments

  if ($LASTEXITCODE -ne 0) {
    throw "Command failed with exit code ${LASTEXITCODE}: $Command $($CommandArguments -join ' ')"
  }
}

if ($Version -notmatch '^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$') {
  throw "Invalid version '$Version'. Use a semantic version such as 0.0.4 or 0.1.0-beta.1."
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw 'npm was not found. Install Node.js and npm before publishing.'
}

if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
  throw 'pnpm was not found. Install pnpm before publishing.'
}

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $projectRoot

$registry = (& npm config get registry).TrimEnd('/')
if ($LASTEXITCODE -ne 0) {
  throw 'Unable to read the npm registry configuration.'
}

if ($registry -ne 'https://registry.npmjs.org') {
  throw "The current npm registry is '$registry'. Run 'npm config set registry https://registry.npmjs.org/' first."
}

Write-Host 'Checking npm login...'
Invoke-CheckedCommand npm whoami

$packageName = (& node -p "require('./package.json').name").Trim()
if ($LASTEXITCODE -ne 0 -or -not $packageName) {
  throw 'Unable to read the package name from package.json.'
}

$currentVersion = (& node -p "require('./package.json').version").Trim()
if ($LASTEXITCODE -ne 0 -or -not $currentVersion) {
  throw 'Unable to read the current version from package.json.'
}

Write-Host "Package: $packageName"
Write-Host "Version: $currentVersion -> $Version"

Invoke-CheckedCommand npm pkg set "version=$Version"

Write-Host 'Running type checks...'
Invoke-CheckedCommand pnpm run typecheck

Write-Host 'Building package...'
Invoke-CheckedCommand pnpm run build

Write-Host 'Previewing package contents...'
Invoke-CheckedCommand npm pack --dry-run

if ($DryRun) {
  Write-Host "Dry run complete. package.json is now set to version $Version. Nothing was published."
  exit 0
}

Write-Host ''
Write-Host "Ready to publish $packageName@$Version to the public npm registry."
$confirmation = Read-Host "Type PUBLISH to continue"

if ($confirmation -cne 'PUBLISH') {
  Write-Host 'Publication cancelled. No package was uploaded.'
  exit 0
}

Invoke-CheckedCommand npm publish

Write-Host 'Verifying published version...'
Invoke-CheckedCommand npm view "$packageName@$Version" version

Write-Host "Successfully published $packageName@$Version."
