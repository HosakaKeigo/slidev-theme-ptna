# Slidev Theme PTNA

[![NPM version](https://img.shields.io/npm/v/@slidev/theme-ptna?color=3AB9D4&label=)](https://www.npmjs.com/package/@slidev/theme-ptna)

一般社団法人 全日本ピアノ指導者協会（PTNA）専用のSlidevテーマです。音楽教育・ピアノ指導に特化したプレゼンテーション作成をサポートします。

## 特徴

- 🎹 **音楽教育に特化したデザイン**: ピアノ指導者向けの洗練されたテーマ
- 🎵 **音楽記号コンポーネント**: 豊富な音楽記号と装飾要素
- 🎼 **ピアノ鍵盤コンポーネント**: インタラクティブなピアノ鍵盤表示
- 🏛️ **PTNAブランディング**: 組織のアイデンティティを反映したロゴとカラースキーム
- 📱 **レスポンシブデザイン**: デスクトップからモバイルまで対応
- 🌙 **ダークモード対応**: ライト・ダークモードの自動切り替え
- 🎨 **カスタマイズ可能**: フロントマターで柔軟な設定変更

## インストール

```bash
npm install @slidev/theme-ptna
```

または

```bash
pnpm add @slidev/theme-ptna
```

## 使用方法

slides.mdのフロントマターでテーマを指定します：

```yaml
---
theme: ptna
title: "ピアノ教育の未来"
subtitle: "デジタル時代の指導法革新"
author: "保坂 恵吾"
authorTitle: "ピアノ指導者"
organization: "全日本ピアノ指導者協会"
event: "PTNA指導者ライセンス講座"
date: "2025年9月11日"
location: "東京国際フォーラム"
---

# ピアノ教育の未来

デジタル時代の指導法革新
```

## レイアウト

### `cover`
表紙・タイトルスライド用のレイアウトです。

```yaml
---
layout: cover
---

# プレゼンテーションタイトル
サブタイトル
```

### `section`
章区切り用のレイアウトです。

```yaml
---
layout: section
sectionNumber: "第1章"
subtitle: "サブタイトル"
description: "章の説明"
---

# 章タイトル
```

### `two-cols`
2カラムレイアウトです。

```yaml
---
layout: two-cols
---

# 左側のコンテンツ

::right::

# 右側のコンテンツ
```

### `center`
中央寄せレイアウトです。

```yaml
---
layout: center
---

# 中央に表示される内容
```

### `default`
標準レイアウトです。

```yaml
---
layout: default
---

# 通常のスライド
```

## コンポーネント

### PianoKeys

インタラクティブなピアノ鍵盤を表示します。

```vue
<PianoKeys 
  :octaves="2" 
  :width="600" 
  showNotes 
  interactive 
/>
```

**Props:**
- `octaves`: 表示するオクターブ数（デフォルト: 1）
- `width`: 鍵盤の幅（デフォルト: 480px）
- `height`: 鍵盤の高さ（デフォルト: 80px）
- `showNotes`: 音名を表示するか（デフォルト: false）
- `activeKeys`: アクティブなキーの配列
- `highlightKeys`: ハイライトするキーの配列
- `interactive`: クリック可能にするか（デフォルト: false）
- `small`: 小さいサイズで表示
- `large`: 大きいサイズで表示
- `vertical`: 縦向きで表示

### MusicalNote

音楽記号を表示します。

```vue
<MusicalNote 
  type="treble" 
  size="xl" 
  color="#770000" 
  animation="float" 
/>
```

**Props:**
- `type`: 音符の種類（'quarter', 'eighth', 'treble', 'bass', etc.）
- `size`: サイズ（'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'）
- `color`: 色（デフォルト: currentColor）
- `animation`: アニメーション（'float', 'rotate', 'pulse', 'none'）
- `delay`: アニメーション開始の遅延（ms）
- `rotate`: 回転角度（度）
- `interactive`: クリック可能にするか

**利用可能な音楽記号:**
- 音符: `quarter`, `eighth`, `sixteenth`, `half`, `whole`
- 音部記号: `treble`, `bass`
- 臨時記号: `sharp`, `flat`, `natural`
- 休符: `rest-quarter`, `rest-eighth`, `rest-half`, `rest-whole`

### PTNALogo

PTNAのロゴを表示します。

```vue
<PTNALogo 
  size="lg" 
  showText 
  showFullName 
  href="https://www.piano.or.jp/"
/>
```

**Props:**
- `src`: ロゴ画像のURL
- `alt`: 代替テキスト
- `size`: サイズ（'xs', 'sm', 'md', 'lg', 'xl', '2xl'）
- `variant`: バリアント（'default', 'header', 'footer', 'cover', 'minimal'）
- `showText`: 組織名を表示するか
- `showFullName`: 正式名称を表示するか
- `href`: リンク先URL
- `target`: リンクターゲット

## カラースキーム

テーマは以下のカラーパレットを使用します：

- **プライマリ**: `#770000` (PTNA レッド)
- **セカンダリ**: `#ffffff` (白)
- **アクセント**: `#000000` (黒)
- **グレー**: `#666666`

CSSカスタムプロパティでカラーをカスタマイズできます：

```css
:root {
  --ptna-primary: #770000;
  --ptna-white: #ffffff;
  --ptna-black: #000000;
  --ptna-gray: #666666;
}
```

## フロントマター設定

スライドのフロントマターで以下の設定が可能です：

```yaml
---
theme: ptna
# 基本情報
title: "プレゼンテーションタイトル"
subtitle: "サブタイトル"
author: "発表者名"
authorTitle: "肩書き"
organization: "所属組織"

# イベント情報
event: "イベント名"
date: "2025年9月11日"
location: "会場名"

# 表示設定
showHeader: true          # ヘッダーを表示
showFooter: true          # フッターを表示
showLogo: true           # ロゴを表示
showPageNumber: true     # ページ番号を表示

# カラースキーム
colorSchema: auto        # auto | light | dark

# フォント設定
fonts:
  sans: 'Noto Sans JP'
  serif: 'Noto Serif JP'  
  mono: 'JetBrains Mono'
---
```

## スタイルカスタマイズ

独自のスタイルを適用したい場合は、スライド内で `<style>` タグを使用できます：

```vue
<style>
h1 {
  color: #770000;
  border-bottom: 3px solid #770000;
}

.custom-highlight {
  background: rgba(119, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #770000;
}
</style>

# カスタムスタイルを適用したスライド

<div class="custom-highlight">
重要なポイント
</div>
```

## 開発・カスタマイズ

このテーマをベースに独自のカスタマイズを行う場合：

```bash
# テーマを複製
git clone https://github.com/ptna-jp/slidev-theme-ptna.git
cd slidev-theme-ptna

# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

## ライセンス

MIT License

## サポート

- 📧 Email: support@piano.or.jp
- 🌐 Website: https://www.piano.or.jp/
- 📚 Documentation: https://github.com/ptna-jp/slidev-theme-ptna

## 必要なアセット

テーマを完全に動作させるために、以下のアセットファイルが必要です：

### ロゴファイル
- `assets/ptna-logo.png` (標準サイズ・ヘッダー用)
- `assets/ptna-logo-large.png` (大サイズ・カバー用)

### 推奨サイズ
- 標準ロゴ: 200x60px (3.33:1 比率)
- 大サイズロゴ: 400x120px (3.33:1 比率)

### ファイル形式
- PNG形式（透明背景推奨）
- SVG形式も対応

これらのアセットファイルをご準備いただければ、テーマが完全に機能します。
