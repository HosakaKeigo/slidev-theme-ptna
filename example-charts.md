---
theme: ./
---

# ECharts Integration Demo

Slidevプレゼンテーションにおける動的チャートの表示

---

# Bar Chart - 棒グラフ

年間売上推移を棒グラフで表示

<div class="h-80">
  <BarChart
    :key="$slidev.nav.currentPage"
    title="年間売上推移"
    :labels="['2021年', '2022年', '2023年', '2024年']"
    :series="[
      { name: '製品A', data: [120, 200, 150, 180] },
      { name: '製品B', data: [80, 90, 110, 140] },
      { name: '製品C', data: [60, 70, 85, 95] }
    ]"
    x-axis-name="年度"
    y-axis-name="売上（百万円）"
  />
</div>

---

# Line Chart - 折れ線グラフ

月次トレンドの可視化

<div class="h-80">
  <LineChart
    :key="$slidev.nav.currentPage"
    title="月次アクセス数推移"
    :labels="['1月', '2月', '3月', '4月', '5月', '6月']"
    :series="[
      { 
        name: 'ページビュー', 
        data: [1200, 1320, 1010, 1340, 900, 2300],
        smooth: true
      },
      { 
        name: 'ユニークユーザー', 
        data: [820, 932, 901, 934, 1290, 1330],
        smooth: true,
        areaStyle: {}
      }
    ]"
    x-axis-name="月"
    y-axis-name="アクセス数"
  />
</div>

---

# Pie Chart - 円グラフ

市場シェアの割合表示

<div class="h-80">
  <PieChart
    :key="$slidev.nav.currentPage"
    title="市場シェア分析"
    :data="[
      { value: 1048, name: 'Google' },
      { value: 735, name: 'Facebook' },
      { value: 580, name: 'Amazon' },
      { value: 484, name: 'Apple' },
      { value: 300, name: 'Microsoft' }
    ]"
  />
</div>

---

# Scatter Chart - 散布図

相関関係の分析

<div class="h-80">
  <ScatterChart
    :key="$slidev.nav.currentPage"
    title="価格と満足度の相関"
    :series="[
      {
        name: '製品グループA',
        data: [[10.0, 8.04], [8.07, 6.95], [13.0, 7.58], [9.05, 8.81], [11.0, 8.33], [14.0, 7.66], [13.4, 6.81], [10.0, 6.33], [14.0, 8.96], [12.5, 6.82]]
      },
      {
        name: '製品グループB',
        data: [[10.0, 9.14], [8.07, 8.14], [13.0, 8.74], [9.05, 8.77], [11.0, 9.26], [14.0, 8.10], [13.4, 8.13], [10.0, 7.26], [14.0, 9.42], [12.5, 8.27]]
      }
    ]"
    x-axis-name="価格（千円）"
    y-axis-name="満足度スコア"
  />
</div>

---

# Radar Chart - レーダーチャート

多角的評価の可視化

<div class="h-80">
  <RadarChart
    :key="$slidev.nav.currentPage"
    title="スキル評価"
    :indicators="[
      { name: 'JavaScript', max: 100 },
      { name: 'TypeScript', max: 100 },
      { name: 'Vue.js', max: 100 },
      { name: 'React', max: 100 },
      { name: 'Node.js', max: 100 },
      { name: 'Python', max: 100 }
    ]"
    :data="[
      { 
        name: '現在のスキル', 
        value: [85, 90, 95, 70, 80, 60],
        areaStyle: { opacity: 0.5 }
      },
      { 
        name: '目標スキル', 
        value: [95, 95, 100, 85, 90, 80],
        areaStyle: { opacity: 0.3 }
      }
    ]"
  />
</div>

---

# 複合チャート表示

<div class="grid grid-cols-2 gap-4">
  <div class="h-64">
    <BarChart
      :key="$slidev.nav.currentPage"
      title="四半期売上"
      :labels="['Q1', 'Q2', 'Q3', 'Q4']"
      :series="[
        { name: '2023', data: [120, 132, 101, 134] },
        { name: '2024', data: [145, 162, 143, 178] }
      ]"
    />
  </div>
  <div class="h-64">
    <PieChart
      :key="$slidev.nav.currentPage + '_pie'"
      title="売上内訳"
      :data="[
        { value: 335, name: '直販' },
        { value: 310, name: '代理店' },
        { value: 234, name: 'オンライン' },
        { value: 135, name: 'その他' }
      ]"
      :show-legend="false"
    />
  </div>
</div>

---

# アニメーション付きチャート

クリックでデータを更新

<div class="h-80" v-click>
  <LineChart
    title="動的データ更新"
    :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May']"
    :series="[
      { 
        name: 'データセット', 
        data: $slidev.nav.clicks > 0 ? [100, 180, 140, 200, 160] : [50, 60, 55, 70, 65],
        smooth: true,
        areaStyle: { opacity: 0.3 }
      }
    ]"
  />
</div>

---
layout: center
---

# 🎉 ECharts Integration Complete!

高機能でインタラクティブなチャートが利用可能になりました

<script setup>
import { BarChart, LineChart, PieChart, ScatterChart, RadarChart } from './components/charts';
</script>