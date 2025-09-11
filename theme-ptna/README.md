# PTNA Theme for Slidev

全日本ピアノ指導者協会（PTNA）公式Slidevテーマです。

## 特徴

- **PTNAブランドカラー**: メインカラー #770000（深紅）を基調としたエレガントなデザイン
- **音楽的な要素**: 音符や五線譜などの音楽モチーフを随所に配置
- **日本語フォント対応**: ヒラギノ角ゴシック等の日本語フォントに最適化
- **多様なレイアウト**: プレゼンテーション用途に応じた8種類のレイアウト
- **レスポンシブデザイン**: デスクトップ・モバイル両対応

## レイアウト一覧

### `cover`
カバーページ用レイアウト。背景画像やグラデーションに対応し、音楽的な装飾要素を含みます。

### `default`  
標準的なコンテンツページ用レイアウト。ページ番号表示機能付き。

### `section`
セクション区切り用レイアウト。大きなタイトルと装飾的な音楽要素でインパクトを演出。

### `intro`
導入ページ用レイアウト。下部にピアノ鍵盤パターンの装飾。

### `fact`
重要な数値や事実を強調表示するレイアウト。アニメーション付き音符装飾。

### `quote`
引用文表示用レイアウト。五線譜と引用符を組み合わせた装飾。

### `statement`
重要な宣言や声明用レイアウト。エレガントな枠線と角の音符装飾。

### `two-cols`
2カラムレイアウト。中央の縦線に音符装飾付き。

### `center`
中央配置レイアウト。背景に控えめな音符パターン。

## 使用方法

### インストール

```bash
npm install @slidev/theme-ptna
```

### 基本設定

スライドファイル（`slides.md`）の冒頭に以下を追加：

```yaml
---
theme: ptna
highlighter: prism
lineNumbers: false
info: |
  ## PTNAプレゼンテーション
  全日本ピアノ指導者協会のスライドテーマ
drawings:
  persist: false
transition: slide-left
---
```

### レイアウトの使用例

```markdown
---
layout: cover
background: https://example.com/image.jpg
---

# タイトル
## サブタイトル

---
layout: section
---

# セクションタイトル

---
layout: default
---

# 通常のコンテンツ

内容をここに記載...
```

## カスタマイズ

### CSS変数

以下のCSS変数を使用してカスタマイズできます：

```css
:root {
  --ptna-primary: #770000;        /* メインカラー */
  --ptna-primary-light: #aa0000;  /* ライトカラー */
  --ptna-primary-dark: #550000;   /* ダークカラー */
  --ptna-secondary: #ffffff;      /* セカンダリカラー */
  --ptna-accent: #000000;         /* アクセントカラー */
  --ptna-gray: #666666;           /* グレー */
}
```

### フォント設定

デフォルトで日本語フォントが設定されていますが、`slidev`設定でカスタマイズ可能：

```yaml
---
theme: ptna
fonts:
  sans: 'Hiragino Kaku Gothic ProN, Yu Gothic UI, sans-serif'
  serif: 'Hiragino Mincho ProN, Yu Mincho, serif'
  mono: 'Fira Code, monospace'
---
```

## 開発

### ローカル開発

```bash
git clone <repository-url>
cd slidev-theme-ptna
npm install
npm run dev
```

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

## ライセンス

MIT License

## 著者

- **開発者**: 保坂恵吾 (Hosaka Keigo)
- **メール**: hosaka@piano.or.jp
- **組織**: 全日本ピアノ指導者協会

## 貢献

プルリクエストやissueの報告を歓迎します。

## 関連リンク

- [全日本ピアノ指導者協会 公式サイト](https://www.piano.or.jp)
- [Slidev 公式サイト](https://sli.dev)
- [GitHub リポジトリ](https://github.com/HosakaKeigo/slidev-theme-ptna)