# AI大喜利

[demo](https://github.com/user-attachments/assets/62e87cb4-d596-485f-9cde-94f07b40827a)

このリポジトリは、Spring BootとSpring AI、Ollamaを活用した**AI大喜利チャット**のプロジェクトです。  

---

## 特徴

- **Spring Boot (Java 21, Maven)**
- **Spring AI**（ローカルOllamaモデルと連携）
- **WebSocket-STOMP**によるリアルタイム通信
- **Gemma3:4b**モデルを利用
- **認証なし、勉強用の簡易設計**
- **フロントエンドはHTML/CSS/JSのみで構成**
- **お題の自動生成・手入力対応**
- **AI回答のローディング表示あり**
- **モダンなUIデザイン**

---

## 前提

- Java 21
- Maven
- Ollamaがローカルで起動済み
- 開発用途のみ（本番利用不可）

---

## 起動方法

1. **Ollamaを起動**  

```
ollama run gemma3:4b
```

2. **Spring Bootアプリを起動**  

```
mvn spring-boot:run
```

3. **ブラウザでアクセス**  

```
http://localhost:8080/index.html
```

---

## 構成ファイル

- `src/main/resources/static/index.html` ... フロントエンドHTML
- `src/main/resources/static/style.css` ... デザイン
- `src/main/resources/static/app.js` ... フロントロジック

---

## 注意事項

- 本システムは**技術検証・学習目的**のサンプルです。
- セキュリティ・エラーハンドリング等は最小限です。
- コードの流用や改変はご自由にどうぞ。

---

## ライセンス

MITライセンス
