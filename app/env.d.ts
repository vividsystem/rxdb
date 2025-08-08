/// <reference types="vinxi/types/client" />

interface ImportMetaEnv {
	DB_PASSWORD: string;
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv
}
