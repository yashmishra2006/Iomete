<!-- source: https://iomete.com/resources/integrations/dbtools/dbeaver | scraped 2026-11-01 -->

Page title: DBeaver | IOMETE
URL: https://iomete.com/resources/integrations/dbtools/dbeaver
Meta description: Connect DBeaver to IOMETE using the Arrow Flight SQL JDBC driver.

---

- DB Tools
- DBeaver

On this page

# DBeaver

DBeaver is a cross-platform database tool. It connects to IOMETE over the Arrow Flight SQL protocol using a JDBC driver. You can choose between two Arrow Flight drivers, and both work the same way:

- IOMETE custom build: adds proxy support, a connection-level query timeout, and named parameters. See the Arrow Flight SQL JDBC Driver guide for the details.
- Apache Arrow Flight SQL JDBC driver: the standard upstream build, also fully compatible.

There's also a legacy Hive JDBC driver that connects over the deprecated HiveServer2 protocol. It's slower and has known compatibility issues with schema selection and catalog names. Use Arrow Flight SQL unless you have a specific reason to use the Hive driver.

The steps below apply to either Arrow Flight driver.

## Downloading the Driver

DBeaver needs the JDBC driver JAR on disk before it can connect to IOMETE. Download the IOMETE custom build from the iomete-artifacts GitHub repository, where the files follow the naming convention flight-sql-jdbc-driver-<upstream>-iomete.<release>.jar.

To use the standard upstream driver instead, download it from the Apache Arrow releases page.

## Registering the Driver in DBeaver

DBeaver doesn't ship with the Arrow Flight SQL driver. Register the JAR once, then reuse it for every IOMETE connection.

Open DBeaver and go to Database → Driver Manager.

Click New to create a driver.

On the Libraries tab, click Add File and select the JAR you downloaded. Then click Find Class to let DBeaver resolve the driver class.

Switch to the Settings tab and confirm:

- Driver Name: IOMETE Arrow Flight SQL
- Driver Type: Generic
- Class Name: org.apache.arrow.driver.jdbc.ArrowFlightJdbcDriver

Click OK to save.

## Connecting to IOMETE

With the driver registered, you can open a connection and browse your data.

Click New Database Connection and select the IOMETE Arrow Flight SQL driver.

Find your connection details in the IOMETE Console: Compute → select a compute → Connections tab → Arrow Flight. Copy the JDBC connection string.

Paste it into the JDBC URL field (it looks like jdbc:arrow-flight-sql://<host>:443?cluster=<cluster>&data-plane=<data-plane>), then enter your credentials in the Username and Password fields below it.

note

Use an Access Token generated in the IOMETE Console as the password.

Click Test Connection, then Finish.

If the connection succeeds, the Database Navigator lists your catalogs, schemas, and tables so you can start querying.

## Java Version Requirements

If Arrow Flight connections fail the moment you hit Test Connection, a modern version of Java is usually the cause. DBeaver bundles and runs its own copy of Java, independent of any Java installed on your machine. On Java 16 and newer, the Arrow Flight SQL driver needs a couple of extra startup flags. Without them, it can't set up its memory and the connection fails right away, usually with a Could not initialize class ...RootAllocator error. See Symptoms Without the Flags in the driver guide for the full error messages.

Auto-Update Can Trigger This Overnight

A DBeaver update can silently swap its bundled Java for a newer version. A setup that worked yesterday then starts failing, even though you never touched your driver or connection. So if Arrow Flight breaks right after a DBeaver update, apply the flags below.

Add the required flags to dbeaver.ini:

Locate dbeaver.ini:

- macOS: DBeaver.app/Contents/Eclipse/dbeaver.ini (right-click the app → Show Package Contents)
- Windows: dbeaver.ini next to dbeaver.exe in the install folder
- Linux: dbeaver.ini in the install directory

Add each flag on its own line after the -vmargs line (every argument in dbeaver.ini must be on a separate line):

```
-vmargs
--add-opens=java.base/java.nio=ALL-UNNAMED
--sun-misc-unsafe-memory-access=allow

```

Each flag does the following:

- --add-opens=java.base/java.nio=ALL-UNNAMED opens Java's internal java.nio package so the driver can reach the direct memory it needs. Java's module system blocks this by default on Java 16 and newer (JEP 396).
- --sun-misc-unsafe-memory-access=allow re-enables the internal Unsafe memory API the driver relies on. Java 24 only prints a deprecation warning, but Java 25 and newer deny it by default, so without this flag the driver can't initialize its memory allocator (JEP 498).

Include --sun-misc-unsafe-memory-access=allow only if DBeaver's bundled Java is version 24 or newer; on older versions it prevents startup. When unsure, add --add-opens first, retry, and add the second flag only if the failure persists.

Fully quit and restart DBeaver (a window reload isn't enough), then retry Test Connection.

For the per-version flag matrix and the reasoning behind each flag, see Java Version Requirements in the driver guide.

## Resources

Arrow Flight SQL JDBC Driver

Configure the IOMETE custom driver, including proxy tunneling, query timeout, and named parameters.

Hive JDBC Driver

Legacy HiveServer2 driver. Use only if Arrow Flight SQL is not an option.

Previous

Redash

Next

Dataiku

## ON THIS PAGE

- Downloading the Driver
- Registering the Driver in DBeaver
- Connecting to IOMETE
- Java Version Requirements
- Resources
