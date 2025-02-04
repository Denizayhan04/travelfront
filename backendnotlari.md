# Travel App Backend

Bu proje, insanların seyahat arkadaşı bulabileceği ve seyahat planları paylaşabileceği bir sosyal platform uygulamasının backend kısmıdır.

## Özellikler

### 1. Kullanıcı İşlemleri
- Kayıt ve giriş sistemi
- Profil yönetimi (profil fotoğrafı, arkaplan fotoğrafı, bio, konum)
- Arkadaşlık sistemi (istek gönderme, kabul etme, reddetme)
- Kullanıcı engelleme sistemi
- İlgi alanları ve seyahat tarzı belirleme
- Sosyal medya bağlantıları (Instagram, Twitter)

### 2. Seyahat Planları
- Plan oluşturma (konum, tarih, bütçe)
- Planlara katılımcı ekleme
- Plan durumu takibi (planlandı, devam ediyor, tamamlandı)
- Plan arama ve filtreleme

### 3. Topluluklar
- Topluluk oluşturma ve yönetme
- Topluluk profil ve arkaplan fotoğrafları
- Üye yönetimi
- Topluluk içi paylaşımlar
- Topluluk arama

### 4. Mesajlaşma Sistemi
#### Birebir Mesajlaşma
- Kullanıcılar arası özel mesajlaşma
- Resim gönderme desteği
- Mesaj okundu bilgisi
- Okunmamış mesaj sayacı
- Mesaj silme özelliği
- Engellenen kullanıcılarla mesajlaşma engeli

#### Grup Mesajlaşma
- Grup oluşturma ve yönetme
- Grup fotoğrafı ve açıklaması
- Çoklu üye ekleme
- Admin yetkilendirme sistemi
- Toplu mesajlaşma
- Mesaj okundu bilgisi
- Gruptan ayrılma/çıkarılma

### 5. Gönderiler (Posts)
- İçerik paylaşımı
- Resim ekleme
- Kullanıcı etiketleme
- Beğeni sistemi
- Yorum sistemi
- Gönderi silme

## Teknolojiler

- **Backend**: Node.js
- **API**: GraphQL (Apollo Server)
- **Veritabanı**: MongoDB
- **Dosya Depolama**: Firebase Storage
- **Authentication**: JWT
- **Güvenlik**: 
  - Helmet güvenlik başlıkları
  - Rate Limiting
  - CORS koruması
  - GraphQL query complexity analizi

## API Örnekleri

### 1. Kullanıcı İşlemleri
```graphql
# Kayıt
mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    token
    user {
      id
      username
      email
    }
  }
}

# Kullanıcı Engelleme
mutation BlockUser($userId: ID!) {
  blockUser(userId: $userId) {
    id
    username
    blockedUsers {
      id
      username
    }
  }
}
```

### 2. Mesajlaşma
```graphql
# Direkt Mesaj Gönderme
mutation SendDirectMessage($receiverId: ID!, $content: String!, $image: String) {
  sendDirectMessage(receiverId: $receiverId, content: $content, image: $image) {
    id
    content
    image
    read
  }
}

# Grup Oluşturma
mutation CreateGroupChat($input: CreateGroupChatInput!) {
  createGroupChat(input: $input) {
    id
    name
    description
    photo
    members {
      userId
      role
    }
  }
}
```

### 3. Topluluk İşlemleri
```graphql
# Topluluk Fotoğrafı Güncelleme
mutation UpdateCommunityPhotos($communityId: ID!, $profilePhoto: String, $backgroundPhoto: String) {
  updateCommunityPhotos(
    communityId: $communityId
    profilePhoto: $profilePhoto
    backgroundPhoto: $backgroundPhoto
  ) {
    id
    name
    profilePhoto
    backgroundPhoto
  }
}
```

## Veritabanı Şeması

### User Model
- username (String, unique)
- email (String, unique)
- passwordHash (String)
- profilePicture (String)
- backgroundImage (String)
- bio (String)
- location (String)
- interests (Array of String)
- travelStyle (String)
- socialLinks (Object)
- friends (Array of ObjectId)
- friendRequests (Array of ObjectId)
- sentRequests (Array of ObjectId)
- blockedUsers (Array of ObjectId)
- blockedByUsers (Array of ObjectId)

### Community Model
- name (String, unique)
- description (String)
- profilePhoto (String)
- backgroundPhoto (String)
- creatorId (ObjectId)
- members (Array of ObjectId)
- posts (Array of ObjectId)

### DirectMessage Model
- senderId (ObjectId)
- receiverId (ObjectId)
- content (String)
- image (String)
- read (Boolean)
- deletedBySender (Boolean)
- deletedByReceiver (Boolean)

### GroupChat Model
- name (String)
- description (String)
- photo (String)
- creatorId (ObjectId)
- members (Array of Objects)
  - userId (ObjectId)
  - role (String: 'admin' | 'member')
  - joinedAt (Date)
- messages (Array of Objects)
  - senderId (ObjectId)
  - content (String)
  - image (String)
  - readBy (Array of Objects)
    - userId (ObjectId)
    - readAt (Date)

## Kurulum

1. Gerekli paketleri yükleyin:
```bash
npm install
```

2. `.env` dosyasını oluşturun:
```env
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Firebase Config
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=your-client-cert-url
FIREBASE_STORAGE_BUCKET=your-bucket-name.appspot.com

# Client URL
CLIENT_URL=http://localhost:3000
```

3. Uygulamayı başlatın:
```bash
# Development
npm run dev

# Production
npm start
```

## Frontend İçin Notlar

1. Apollo Client kurulumu gerekli
2. JWT token yönetimi için auth context oluşturulmalı
3. GraphQL query ve mutation'ları için hooks yazılmalı
4. Dosya yükleme için özel hook'lar oluşturulmalı
5. Real-time mesajlaşma için subscription'lar kullanılmalı
6. Error handling için global error boundary kurulmalı
