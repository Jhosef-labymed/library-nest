export type SqlServerExtraOptions = {
    instanceName?: string;
    fallbackToDefaultDb?: boolean;
    enableAnsiNullDefault?: boolean;
    connectTimeout?: number;
    cancelTimeout?: number;
    packetSize?: number;
    useUTC?: boolean;
    abortTransactionOnError?: boolean;
    localAddress?: string;
    useColumnNames?: boolean;
    camelCaseColumns?: boolean;
    disableOutputReturning?: boolean;
    disableAsciiToUnicodeParamConversion?: boolean;
    debug?: {
      packet?: boolean;
      data?: boolean;
      payload?: boolean;
      token?: boolean;
   };
    isolation?:
     | 'READ_UNCOMMITTED'
     | 'READ_COMMITTED'
     | 'REPEATABLE_READ'
     | 'SERIALIZABLE'
     | 'SNAPSHOT';
    connectionIsolationLevel?:
     | 'READ_UNCOMMITTED'
     | 'READ_COMMITTED'
     | 'REPEATABLE_READ'
     | 'SERIALIZABLE'
     | 'SNAPSHOT';
     readOnlyIntent?: boolean;
    encrypt?: boolean;
    cryptoCredentialsDetails?: any;
    rowCollectionOnDone?: boolean;
    rowCollectionOnRequestCompletion?: boolean;
    tdsVersion?: string;
    enableArithAbort?: boolean;
    appName?: string;
    trustServerCertificate?: boolean;
 };
 