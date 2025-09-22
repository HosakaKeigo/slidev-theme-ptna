<!--
StepIndicator Component - プロセス・手順表示コンポーネント

使用用途:
- 複数のステップからなる手順の表示
- プロセスの進行状況の視覚化
- カリキュラムや学習ステップの表示
- ワークフローの説明

特徴:
- 番号付きステップの連続表示
- 現在のステップをハイライト
- 完了済み・進行中・未着手の状態表示
- 音符装飾付きのデザイン

使用方法:
<StepIndicator 
  :steps="[
    { title: 'ステップ1', description: '準備' },
    { title: 'ステップ2', description: '実施' },
    { title: 'ステップ3', description: '確認' }
  ]"
  :current="1"
/>
-->

<script setup lang="ts">
import { computed } from 'vue';

interface Step {
  title: string;
  description?: string;
  icon?: string;
  completed?: boolean;
}

const props = defineProps<{
  steps: Step[];
  current?: number;
  layout?: 'horizontal' | 'vertical';
  showConnector?: boolean;
  animate?: boolean;
  size?: 'small' | 'medium' | 'large';
}>();

const currentStep = computed(() => props.current ?? -1);

const sizeConfig = computed(() => {
  switch (props.size) {
    case 'small':
      return {
        circle: 'w-8 h-8',
        number: 'text-xs',
        title: 'text-sm',
        description: 'text-xs',
        connector: 'h-0.5',
        gap: 'gap-2',
      };
    case 'large':
      return {
        circle: 'w-16 h-16',
        number: 'text-xl',
        title: 'text-lg',
        description: 'text-base',
        connector: 'h-1',
        gap: 'gap-4',
      };
    default:
      return {
        circle: 'w-12 h-12',
        number: 'text-base',
        title: 'text-base',
        description: 'text-sm',
        connector: 'h-0.5',
        gap: 'gap-3',
      };
  }
});

const getStepState = (index: number) => {
  if (props.steps[index]?.completed || index < currentStep.value) {
    return 'completed';
  } else if (index === currentStep.value) {
    return 'current';
  } else {
    return 'pending';
  }
};

const getStepClasses = (state: string) => {
  switch (state) {
    case 'completed':
      return {
        circle: 'bg-green-500 text-white',
        title: 'text-green-600 font-semibold',
        connector: 'bg-green-500',
      };
    case 'current':
      return {
        circle: 'bg-ptna-primary text-white ring-4 ring-ptna-primary ring-opacity-30',
        title: 'text-ptna-primary font-bold',
        connector: 'bg-gray-300',
      };
    default:
      return {
        circle: 'bg-gray-300 text-gray-500',
        title: 'text-gray-500',
        connector: 'bg-gray-300',
      };
  }
};
</script>

<template>
  <div class="step-indicator">
    <div 
      :class="[
        'steps-container',
        layout === 'vertical' ? 'flex-col' : 'flex items-start justify-between',
        sizeConfig.gap,
      ]"
    >
      <div
        v-for="(step, index) in steps"
        :key="index"
        :class="[
          'step-item relative',
          layout === 'vertical' ? 'flex items-start' : 'flex-1',
          animate && getStepState(index) === 'current' ? 'animate-pulse-soft' : '',
        ]"
      >
        <!-- Step circle and connector -->
        <div :class="['step-visual', layout === 'vertical' ? 'flex-shrink-0 mr-4' : 'flex flex-col items-center']">
          <!-- Circle with number/icon -->
          <div 
            :class="[
              'step-circle rounded-full flex items-center justify-center transition-all duration-300',
              sizeConfig.circle,
              getStepClasses(getStepState(index)).circle,
            ]"
          >
            <!-- Completed checkmark -->
            <span v-if="getStepState(index) === 'completed'" class="text-lg">
              ✓
            </span>
            <!-- Icon if provided -->
            <span v-else-if="step.icon" :class="sizeConfig.number">
              {{ step.icon }}
            </span>
            <!-- Step number -->
            <span v-else :class="['font-bold', sizeConfig.number]">
              {{ index + 1 }}
            </span>
          </div>

          <!-- Connector line -->
          <div 
            v-if="showConnector !== false && index < steps.length - 1"
            :class="[
              'step-connector transition-all duration-300',
              layout === 'vertical' ? 'w-0.5 min-h-[3rem] ml-6 -mt-2' : 'flex-1 mt-3',
              sizeConfig.connector,
              getStepClasses(getStepState(index)).connector,
            ]"
          ></div>
        </div>

        <!-- Step content -->
        <div :class="['step-content', layout === 'vertical' ? 'flex-1 pb-8' : 'mt-3']">
          <!-- Title -->
          <div 
            :class="[
              'step-title',
              sizeConfig.title,
              getStepClasses(getStepState(index)).title,
              layout !== 'vertical' ? 'text-center' : '',
            ]"
          >
            {{ step.title }}
          </div>

          <!-- Description -->
          <div 
            v-if="step.description"
            :class="[
              'step-description mt-1',
              sizeConfig.description,
              'text-gray-600',
              layout !== 'vertical' ? 'text-center' : '',
            ]"
          >
            {{ step.description }}
          </div>

          <!-- Cat paw decoration for current step -->
          <div 
            v-if="getStepState(index) === 'current'"
            :class="[
              'cat-paw absolute',
              layout === 'vertical' ? '-left-8' : '-top-8 left-1/2 transform -translate-x-1/2',
              'text-ptna-primary opacity-50 text-2xl',
              animate ? 'animate-float' : '',
            ]"
          >
            🐾
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-indicator {
  @apply w-full py-4;
}

/* Connector line for horizontal layout */
.steps-container:not(.flex-col) .step-connector {
  width: 100%;
  margin: 0 1rem;
}

/* Animations */
@keyframes pulse-soft {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse-soft {
  animation: pulse-soft 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-5px) translateX(-50%);
  }
}

.animate-float {
  animation: float 2s ease-in-out infinite;
}

/* Vertical layout specific animation */
.flex-col .animate-float {
  animation: none;
}

.flex-col .cat-paw.animate-float {
  animation: float-vertical 2s ease-in-out infinite;
}

@keyframes float-vertical {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-3px);
  }
}

/* Custom colors */
.bg-ptna-primary {
  background-color: var(--ptna-primary);
}

.text-ptna-primary {
  color: var(--ptna-primary);
}

.ring-ptna-primary {
  --tw-ring-color: var(--ptna-primary);
}

/* Hover effects */
.step-item:hover .step-circle {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.step-item:hover .cat-paw {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .steps-container:not(.flex-col) {
    @apply flex-col;
  }

  .steps-container:not(.flex-col) .step-visual {
    @apply flex-row items-center mb-2;
  }

  .steps-container:not(.flex-col) .step-connector {
    @apply w-0.5 h-12 ml-0 mt-0 mx-6;
  }

  .steps-container:not(.flex-col) .step-content {
    @apply text-left mt-0 ml-4;
  }
}
</style>