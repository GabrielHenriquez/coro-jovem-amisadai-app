# 🎵 Coro Jovem Amisadai App

[![Expo](https://img.shields.io/badge/Expo-53.0.20-blue.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](https://github.com/gabrielrick2941/coro-jovem-amisadai-app)

> Aplicativo móvel para gerenciamento do Coro Jovem Amisadai, desenvolvido com React Native e Expo.

## 📱 Sobre o Projeto

O **Coro Jovem Amisadai App** é uma aplicação móvel completa que eu desenvolvi para auxiliar na gestão e organização das atividades do Coro Jovem que eu faço parte. O app oferece funcionalidades para gerenciar membros, chamadas, repertório de músicas e relatórios, proporcionando uma experiência moderna e intuitiva para o secretário/dirigentes.

## ✨ Funcionalidades Principais

### 🎤 Gestão de Chamadas
- Criação e gerenciamento de chamadas
- Calendário de chamadas com visualização por mês
- Controle de presença dos membros
- Relatórios detalhados de participação

### 👥 Gestão de Membros
- Cadastro completo de membros do coro
- Informações pessoais e de contato
- Histórico de participação
- Upload de fotos de perfil

### 🎵 Repertório Musical
- Biblioteca de músicas
- Adição e edição de repertório

### 📊 Relatórios e Estatísticas
- Geração de relatórios em PDF
- Estatísticas de participação
- Relatórios de componentes faltantes
- Exportação de dados

### 🔔 Notificações
- Notificações de aniversários
- Sincronização automática

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento e build
- **TypeScript** - Linguagem de programação tipada
- **NativeWind** - Framework CSS-in-JS baseado no Tailwind CSS
- **React Navigation** - Navegação entre telas
- **React Hook Form** - Gerenciamento de formulários
- **Yup** - Validação de schemas

### Estado e Gerenciamento
- **Zustand** - Gerenciamento de estado global
- **React Query (TanStack Query)** - Gerenciamento de estado do servidor
- **MMKV** - Armazenamento local de alta performance

### UI/UX
- **React Native Reanimated** - Animações fluidas
- **Bottom Sheet Modal** - Componentes de interface
- **Shimmer Placeholder** - Estados de carregamento
- **Lucide React Native** - Ícones modernos

### Backend e Serviços
- **Firebase** - Autenticação, banco de dados e storage
- **Expo Secure Store** - Armazenamento seguro
- **Expo Notifications** - Sistema de notificações
- **Expo Image Picker** - Seleção de imagens

### Utilitários
- **Axios** - Cliente HTTP
- **CPF/CNPJ Validator** - Validação de documentos
- **React Native PDF** - Geração e visualização de PDFs
- **React Native Calendars** - Componentes de calendário

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/gabrielrick2941/coro-jovem-amisadai-app.git
   cd coro-jovem-amisadai-app
   ```

2. **Instale as dependências**
   ```bash
   yarn install
   # ou
   npm install
   ```

3. **Configure as variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   API_KEY=sua_api_key_do_firebase
   APP_ID=seu_app_id_do_firebase
   AUTH_DOMAIN=seu_auth_domain_do_firebase
   MESSAGING_SENDER_ID=seu_messaging_sender_id
   PROJECT_ID=seu_project_id_do_firebase
   STORAGE_BUCKET=seu_storage_bucket_do_firebase
   ENV=PRODUCTION ou STAGING
   ```

4. **Execute o projeto**
   ```bash
   # Iniciar o servidor de desenvolvimento
   yarn start
   
   # Executar no Android
   yarn android
   
   # Executar no iOS
   yarn ios
   
   # Executar na web
   yarn web
   ```

## 📱 Estrutura do Projeto

```
src/
├── features/           # Funcionalidades principais
│   ├── auth/          # Autenticação e autorização
│   ├── calls/         # Gestão de chamadas
│   ├── members/       # Gestão de membros
│   └── splash/        # Tela de splash
├── global/            # Configurações globais
│   ├── components/    # Componentes reutilizáveis
│   ├── configs/       # Configurações (Firebase, API, Logger)
│   ├── constants/     # Constantes da aplicação
│   ├── hooks/         # Hooks customizados
│   ├── services/      # Serviços globais
│   ├── styles/        # Estilos globais
│   └── utils/         # Utilitários
└── navigation/        # Configuração de navegação
    ├── drawer/        # Navegação drawer
    └── tabs/          # Navegação por abas
```

## 🧪 Testes

```bash
# Executar todos os testes
yarn test

# Executar testes em modo watch
yarn test:watch

# Executar testes com cobertura
yarn test:coverage
```

## 📦 Build e Deploy

### Android
```bash
# Build para desenvolvimento
expo run:android

# Build para produção (via EAS)
eas build --platform android
```

### iOS
```bash
# Build para desenvolvimento
expo run:ios

# Build para produção (via EAS)
eas build --platform ios
```

## 🔧 Configurações

### Firebase
O projeto utiliza Firebase para:
- Autenticação de usuários
- Banco de dados Firestore

### Expo
- Configuração de splash screen
- Permissões de dispositivo
- Plugins personalizados
- Sistema de atualizações OTA

## 📱 Permissões do App

### Android
- `RECORD_AUDIO` - Gravação de áudio
- `READ_EXTERNAL_STORAGE` - Leitura de arquivos
- `WRITE_EXTERNAL_STORAGE` - Escrita de arquivos
- `DOWNLOAD_WITHOUT_NOTIFICATION` - Downloads
- `ACCESS_NETWORK_STATE` - Estado da rede
- `VIBRATE` - Vibração
- `WAKE_LOCK` - Manter tela ativa
- `RECEIVE_BOOT_COMPLETED` - Receber notificações de inicialização

## 🎨 Design System

O projeto utiliza um design system consistente com:
- **Cores**: Paleta baseada em tons de verde (#4C5E46)
- **Tipografia**: Fontes Poppins e Rubik
- **Componentes**: Biblioteca de componentes reutilizáveis
- **Responsividade**: Adaptação para diferentes tamanhos de tela

## 🤝 Contribuição

Este é um projeto privado desenvolvido para o Coro Jovem Amisadai. Para contribuições ou dúvidas, entre em contato com a equipe de desenvolvimento.

## 📄 Licença

Este projeto é privado e proprietário. Todos os direitos reservados.

## 👨‍💻 Desenvolvedor

**Gabriel Rick** - [@gabrielrick2941](https://github.com/gabrielrick2941)

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o projeto, entre em contato através dos canais oficiais do Coro Jovem Amisadai.

---

**Coro Jovem Amisadai App** - Versão 1.0.1  
*Desenvolvido com ❤️ para a comunidade*
