CREATE KEYSPACE IF NOT EXISTS mygatewayapp
    WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 }
    AND DURABLE_WRITES = true;
