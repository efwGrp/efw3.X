@echo off
set WEBHOME=..\..\..
set PROPERTIES=.\batch_helloworld.properties
set LIB=%WEBHOME%\WEB-INF\lib
set CLASSPATH=%WEBHOME%\WEB-INF\classes
set CLASSPATH=%CLASSPATH%;%LIB%\efw-3.0.000.jar
set CLASSPATH=%CLASSPATH%;%LIB%\postgresql-9.3-1103.jdbc4.jar
java efw.efwBatch "{\"eventId\":\"batch_helloworld\",\"params\":{}}"
pause
