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

<div class="h-80 flex items-center justify-center">
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

# Funnel Chart - ファネルチャート

コンバージョン率や段階的プロセスの可視化

<div class="h-80">
  <FunnelChart
    :key="$slidev.nav.currentPage"
    title="コンバージョンファネル"
    :data="[
      { value: 100, name: '訪問' },
      { value: 80, name: 'クリック' },
      { value: 60, name: '閲覧' },
      { value: 40, name: '問い合わせ' },
      { value: 20, name: '購入' }
    ]"
    sort="descending"
  />
</div>

---

# Waterfall Chart - ウォーターフォールチャート

累積変化の可視化

<div class="h-80">
  <WaterfallChart
    :key="$slidev.nav.currentPage"
    title="月次収支の推移"
    :data="[
      { name: '期初残高', value: 1000, type: 'total' },
      { name: '売上1', value: 450 },
      { name: '売上2', value: 380 },
      { name: '経費1', value: -220, type: 'expense' },
      { name: '売上3', value: 300 },
      { name: '経費2', value: -180, type: 'expense' },
      { name: '売上4', value: 250 },
      { name: '経費3', value: -150, type: 'expense' }
    ]"
    :show-total="true"
  />
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

# Race Chart - レースチャート

動的ランキングの可視化

<div class="h-96">
  <RaceChart
    :key="$slidev.nav.currentPage"
    title="売上ランキングの推移"
    :data="[
      { 
        name: '製品A', 
        values: [
          { period: '2021年', value: 120 },
          { period: '2022年', value: 200 },
          { period: '2023年', value: 150 },
          { period: '2024年', value: 180 }
        ],
        color: '#5470c6'
      },
      { 
        name: '製品B', 
        values: [
          { period: '2021年', value: 80 },
          { period: '2022年', value: 90 },
          { period: '2023年', value: 110 },
          { period: '2024年', value: 140 }
        ],
        color: '#91cc75'
      },
      { 
        name: '製品C', 
        values: [
          { period: '2021年', value: 60 },
          { period: '2022年', value: 70 },
          { period: '2023年', value: 85 },
          { period: '2024年', value: 195 }
        ],
        color: '#fac858'
      },
      { 
        name: '製品D', 
        values: [
          { period: '2021年', value: 90 },
          { period: '2022年', value: 100 },
          { period: '2023年', value: 120 },
          { period: '2024年', value: 150 }
        ],
        color: '#ee6666'
      },
      { 
        name: '製品E', 
        values: [
          { period: '2021年', value: 50 },
          { period: '2022年', value: 180 },
          { period: '2023年', value: 160 },
          { period: '2024年', value: 170 }
        ],
        color: '#73c0de'
      }
    ]"
    unit="百万円"
    :max-bars="5"
    :update-frequency="1500"
    :auto-play="true"
  />
</div>

---

# Sankey Chart - サンキー図

フローやプロセスの可視化

<div class="h-80">
  <SankeyChart
    :key="$slidev.nav.currentPage"
    title="エネルギーフロー"
    :nodes="[
      { name: '石炭' },
      { name: '天然ガス' },
      { name: '原子力' },
      { name: '再生可能' },
      { name: '火力発電' },
      { name: '原子力発電' },
      { name: '再生可能発電' },
      { name: '産業' },
      { name: '家庭' },
      { name: '商業' },
      { name: '輸送' }
    ]"
    :links="[
      { source: '石炭', target: '火力発電', value: 150 },
      { source: '天然ガス', target: '火力発電', value: 120 },
      { source: '原子力', target: '原子力発電', value: 100 },
      { source: '再生可能', target: '再生可能発電', value: 80 },
      { source: '火力発電', target: '産業', value: 130 },
      { source: '火力発電', target: '家庭', value: 70 },
      { source: '火力発電', target: '商業', value: 40 },
      { source: '火力発電', target: '輸送', value: 30 },
      { source: '原子力発電', target: '産業', value: 40 },
      { source: '原子力発電', target: '家庭', value: 30 },
      { source: '原子力発電', target: '商業', value: 30 },
      { source: '再生可能発電', target: '産業', value: 30 },
      { source: '再生可能発電', target: '家庭', value: 30 },
      { source: '再生可能発電', target: '商業', value: 20 }
    ]"
    orient="horizontal"
    :node-width="20"
    :node-gap="8"
  />
</div>

---

# Tree Chart - ツリー図

階層構造データの可視化

<div class="h-96">
  <TreeChart
    :key="$slidev.nav.currentPage"
    title="ファイル構造"
    :data="{
      name: 'flare',
      children: [
        {
          name: 'data',
          children: [
            {
              name: 'converters',
              children: [
                { name: 'Converters', value: 721 },
                { name: 'DelimitedTextConverter', value: 4294 }
              ]
            },
            {
              name: 'DataUtil',
              value: 3322
            }
          ]
        },
        {
          name: 'display',
          children: [
            { name: 'DirtySprite', value: 8833 },
            { name: 'LineSprite', value: 1732 },
            { name: 'RectSprite', value: 3623 }
          ]
        },
        {
          name: 'flex',
          children: [{ name: 'FlareVis', value: 4116 }]
        },
        {
          name: 'query',
          children: [
            { name: 'AggregateExpression', value: 1616 },
            { name: 'And', value: 1027 },
            { name: 'Arithmetic', value: 3891 },
            { name: 'Average', value: 891 },
            { name: 'BinaryExpression', value: 2893 },
            { name: 'Comparison', value: 5103 },
            { name: 'CompositeExpression', value: 3677 },
            { name: 'Count', value: 781 },
            { name: 'DateUtil', value: 4141 },
            { name: 'Distinct', value: 933 },
            {
              name: 'methods',
              children: [
                { name: 'add', value: 593 },
                { name: 'and', value: 330 },
                { name: 'average', value: 287 },
                { name: 'count', value: 277 },
                { name: 'distinct', value: 292 },
                { name: 'div', value: 595 },
                { name: 'eq', value: 594 },
                { name: 'fn', value: 460 }
              ]
            },
            { name: 'Query', value: 13896 },
            { name: 'Range', value: 1594 },
            { name: 'StringUtil', value: 4130 },
            { name: 'Variable', value: 1124 }
          ]
        },
        {
          name: 'scale',
          children: [
            { name: 'IScaleMap', value: 2105 },
            { name: 'LinearScale', value: 1316 },
            { name: 'LogScale', value: 3151 },
            { name: 'OrdinalScale', value: 3770 },
            { name: 'Scale', value: 4268 }
          ]
        }
      ]
    }"
    orient="LR"
    :expand-and-collapse="true"
    :initial-tree-depth="3"
    edge-shape="polyline"
    edge-fork-position="63%"
  />
</div>

---

# Heatmap Chart - ヒートマップ

カレンダーヒートマップで日次データの可視化

<div class="h-96">
  <HeatmapChart
    :key="$slidev.nav.currentPage"
    title="Daily Step Count - 2024"
    type="calendar"
    :year="2024"
    :min="0"
    :max="10000"
    :generate-random-data="true"
    :color-steps="5"
  />
</div>

---

# Grid Heatmap - グリッドヒートマップ

相関マトリックスの可視化

<div class="h-80">
  <HeatmapChart
    :key="$slidev.nav.currentPage"
    title="相関マトリックス"
    type="grid"
    :x-labels="['月', '火', '水', '木', '金', '土', '日']"
    :y-labels="['朝', '昼', '夕', '夜']"
    :data="[
      [0, 0, 50], [1, 0, 120], [2, 0, 90], [3, 0, 70], [4, 0, 110], [5, 0, 130], [6, 0, 85],
      [0, 1, 130], [1, 1, 150], [2, 1, 200], [3, 1, 180], [4, 1, 220], [5, 1, 170], [6, 1, 140],
      [0, 2, 80], [1, 2, 100], [2, 2, 90], [3, 2, 110], [4, 2, 95], [5, 2, 120], [6, 2, 105],
      [0, 3, 60], [1, 3, 70], [2, 3, 75], [3, 3, 65], [4, 3, 55], [5, 3, 80], [6, 3, 90]
    ]"
    :min="0"
    :max="250"
    orientation="horizontal"
  />
</div>

---

# カスタムチャート - BaseChart直接利用

任意のEChartsオプションを直接指定

<div class="h-80">
  <BaseChart
    :key="$slidev.nav.currentPage"
    :option="{
      title: { text: 'カスタム3Dパイチャート', left: 'center' },
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' }
        ]
      }]
    }"
  />
</div>

---
layout: center
---

# 🎉 ECharts Integration Complete!

高機能でインタラクティブなチャートが利用可能になりました

<script setup>
import { BarChart, LineChart, PieChart, ScatterChart, RadarChart, FunnelChart, WaterfallChart, RaceChart, SankeyChart, TreeChart, HeatmapChart, BaseChart } from './components/charts';
</script>