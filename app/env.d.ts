/// <reference types="vinxi/types/client" />

interface ImportMetaEnv {
  DB_HOST: string;
	DB_PASSWORD: string;
	DB_USER: string;
	DB_NAME: string;
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv
}
