// build-static.js - Script de build para despliegue estático
import { cpSync, mkdirSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Iniciando build estático...');

const distDir = join(__dirname, 'dist');

// Limpiar dist si existe
if (existsSync(distDir)) {
    rmSync(distDir, { recursive: true });
    console.log('🗑️  Limpiando dist anterior...');
}

// Crear dist
mkdirSync(distDir);
console.log('📁 Creando carpeta dist...');

// Copiar archivos
const filesToCopy = [
    { src: 'index.html', dest: 'index.html' },
    { src: '_headers', dest: '_headers' },
    { src: '_redirects', dest: '_redirects' },
];

const foldersToCopy = [
    { src: 'public', dest: '' },  // Contenido de public va a raíz de dist
    { src: 'assets', dest: 'assets' },
];

// Copiar archivos individuales
filesToCopy.forEach(({ src, dest }) => {
    const srcPath = join(__dirname, src);
    const destPath = join(distDir, dest);
    if (existsSync(srcPath)) {
        cpSync(srcPath, destPath);
        console.log(`✅ Copiado: ${src}`);
    }
});

// Copiar carpetas
foldersToCopy.forEach(({ src, dest }) => {
    const srcPath = join(__dirname, src);
    const destPath = dest ? join(distDir, dest) : distDir;
    if (existsSync(srcPath)) {
        cpSync(srcPath, destPath, { recursive: true });
        console.log(`✅ Copiado carpeta: ${src}`);
    }
});

console.log('');
console.log('✨ Build completado exitosamente!');
console.log('📦 Archivos listos en: frontend/dist/');
console.log('');
