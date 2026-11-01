<!-- source: https://iomete.com/resources/user-guide/datagrip-lakehouse-connection | scraped 2026-11-01 -->

Page title: DataGrip Lakehouse Connection | IOMETE
URL: https://iomete.com/resources/user-guide/datagrip-lakehouse-connection
Meta description: DataGrip Lakehouse Connection

---

- Misc
- DataGrip Lakehouse Connection

On this page

# DataGrip Lakehouse Connection

IOMETE warehouse JDBC endpoints are compatible with Hive JDBC drivers. But due to recent SSL issues, we have released a fixed version of the driver. If you wish to use the JDBC driver must download it from our GitHub repository and include it as a library in their project

### Download the Driver

Visit our GitHub repository iomete-artifacts and download the latest version of the Hive JDBC driver hive-jdbc-4.0.1-standalone.jar.

### Using JDBC driver for DataGrip connection

Registering the IOMETE Driver to DataGrip

Open DataGrip and click on the Data Source Properties button from the toolbar. Or from the menu, File -> Data Sources.

Switch to the Drivers tab and click on the + button to add a new driver.

Add the downloaded driver file (hive-jdbc-4.0.1-standalone.jar) , and make sure org.apache.hive.jdbc.HiveDriver is selected as the driver class. And, provide a name for the driver (e.g., IOMETE).

From the Options tab, choose the dialect as Apache Spark, and optionally choose Icon.

Click on the OK button to save the driver.

Creating a new Data Source for IOMETE

Click on the Data Source Properties button from the toolbar. Or from the menu, File -> Data Sources.

Switch to the Data Sources tab and click on the + button to add a new data source.

Provide connection details

info

You can find the connection details in the IOMETE Console by navigating to the necessary lakehouse and switching to the Connections tab (Select JDBC option).

And, click on the Test Connection button to verify the connection.

Previous

Priority Classes

Next

Temporary Shutdown for Maintenance

## ON THIS PAGE

- Download the Driver
- Using JDBC driver for DataGrip connection
