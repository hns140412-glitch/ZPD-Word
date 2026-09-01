@echo off
chcp 65001 > nul
title Word City Detective - PC Test
cd /d "%~dp0"
echo.
echo ==============================================
echo  Word City Detective - PC 테스트 서버
echo ==============================================
echo  Python 설치가 필요하지 않습니다.
echo  잠시 후 브라우저가 자동으로 열립니다.
echo.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\local-server.ps1" -Port 5500 -Root "%~dp0"
if errorlevel 1 (
  echo.
  echo 서버 실행 중 오류가 발생했습니다.
  pause
)
