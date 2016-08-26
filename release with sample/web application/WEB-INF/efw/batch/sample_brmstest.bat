@echo off
set WEBHOME=..\..\..
set PROPERTIES=.\sample_brmstest.properties
set LIB=%WEBHOME%\WEB-INF\lib
set CLASSPATH=%WEBHOME%\WEB-INF\classes
set CLASSPATH=%CLASSPATH%;%LIB%\efw-3.0.000.jar
set CLASSPATH=%CLASSPATH%;%LIB%/postgresql-9.3-1103.jdbc4.jar
set CLASSPATH=%CLASSPATH%;%LIB%/hsqldb.jar

set CLASSPATH=%CLASSPATH%;%LIB%/axiom-api-1.2.9.jar
set CLASSPATH=%CLASSPATH%;%LIB%/axiom-impl-1.2.9.jar
set CLASSPATH=%CLASSPATH%;%LIB%/commons-logging-1.1.1.jar
set CLASSPATH=%CLASSPATH%;%LIB%/innorules-api.jar
set CLASSPATH=%CLASSPATH%;%LIB%/innorules-batch.jar
set CLASSPATH=%CLASSPATH%;%LIB%/innorulesj.jar
set CLASSPATH=%CLASSPATH%;%LIB%/innoutils.jar
set CLASSPATH=%CLASSPATH%;%LIB%/log4j-1.2.16.jar

java -Dinnoexpert.home=%WEBHOME%\WEB-INF\confb efw.efwBatch "{\"eventId\":\"sample_brmstest\",\"params\":{\"#txt_param1\":\"a\",\"#txt_param2\":\"b\",}}"
pause
