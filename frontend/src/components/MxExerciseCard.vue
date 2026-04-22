<template>
  <div class="exercise-card">
    <div class="ex-header">
      <div class="ex-meta">
        <span class="ex-name">{{ exercise.name }}</span>
        <van-tag plain class="eq-tag">
          {{ equipmentLabels[exercise.equipment] }}
        </van-tag>
      </div>
      <van-icon
        name="delete-o"
        size="18"
        color="#888"
        class="delete-ex-btn"
        @click="$emit('deleteExercise')"
      />
    </div>

    <div class="sets-header">
      <span>Set</span>
      <span>Weight</span>
      <span>Reps</span>
      <span>Vol</span>
      <span />
    </div>

    <div
      v-for="(set, i) in workoutExercise.sets"
      :key="set.id"
      class="set-row"
      :class="{ 'is-pr': isPR(set) }"
      @click="$emit('editSet', set)"
    >
      <span class="set-num">{{ i + 1 }}</span>
      <span class="set-weight">
        {{ set.weight > 0 ? set.weight + ' kg' : 'BW' }}
        <span v-if="isPR(set)" class="pr-badge">PR</span>
      </span>
      <span class="set-reps">{{ set.reps }}</span>
      <span class="set-vol">{{ set.weight * set.reps }}</span>
      <van-icon
        name="cross"
        size="13"
        color="#666"
        @click.stop="$emit('deleteSet', set.id)"
      />
    </div>

    <div v-if="workoutExercise.sets.length === 0" class="no-sets">
      No sets yet. Add your first set below.
    </div>

    <div class="add-set-btn" @click="$emit('addSet')">
      <van-icon name="plus" size="14" />
      <span>Add set</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { equipmentLabels, type Exercise, type WorkoutSet } from '../mockdata';
import { useWorkoutStore } from '@/stores/workout';

interface WorkoutExerciseProp {
  id: number;
  exerciseId: number;
  sets: WorkoutSet[];
}

const props = defineProps<{
  exercise: Exercise;
  workoutExercise: WorkoutExerciseProp;
  date: string;
}>();

defineEmits<{
  addSet: [];
  editSet: [set: WorkoutSet];
  deleteSet: [setId: number];
  deleteExercise: [];
}>();

const workoutStore = useWorkoutStore();

const prWeight = computed(() => {
  const history = workoutStore.getExerciseHistory(props.exercise.id);
  if (!history.length) return 0;
  return Math.max(...history.map((h) => h.maxWeight));
});

function isPR(set: WorkoutSet): boolean {
  return set.weight > 0 && prWeight.value > 0 && set.weight >= prWeight.value;
}
</script>

<style scoped>
.exercise-card {
  background: var(--van-background-2);
  border-radius: 14px;
  margin: 10px 12px;
  overflow: hidden;
}

.ex-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 14px 10px;
}

.ex-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ex-name {
  font-size: 16px;
  font-weight: 700;
  color: var(--van-text-color);
}

.eq-tag {
  align-self: flex-start;
  border-color: var(--van-primary-color);
  color: var(--van-primary-color);
  font-size: 10px;
}

.delete-ex-btn {
  padding: 6px;
}

.sets-header {
  display: grid;
  grid-template-columns: 36px 1fr 1fr 1fr 28px;
  padding: 4px 14px;
  font-size: 11px;
  color: var(--van-text-color-2);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border-top: 1px solid var(--van-border-color);
}

.set-row {
  display: grid;
  grid-template-columns: 36px 1fr 1fr 1fr 28px;
  align-items: center;
  padding: 10px 14px;
  border-top: 1px solid var(--van-border-color);
  cursor: pointer;
  transition: background 0.15s;
}

.set-row:active {
  background: rgba(255, 255, 255, 0.05);
}

.set-row.is-pr {
  background: rgba(255, 193, 7, 0.06);
}

.set-num {
  font-size: 13px;
  color: var(--van-text-color-2);
}

.set-weight {
  font-size: 15px;
  font-weight: 600;
  color: var(--van-text-color);
  display: flex;
  align-items: center;
  gap: 4px;
}

.pr-badge {
  font-size: 9px;
  font-weight: 700;
  color: #ffc107;
  background: rgba(255, 193, 7, 0.15);
  border-radius: 4px;
  padding: 1px 4px;
}

.set-reps,
.set-vol {
  font-size: 14px;
  color: var(--van-text-color);
}

.set-vol {
  color: var(--van-text-color-2);
  font-size: 13px;
}

.no-sets {
  padding: 12px 14px;
  font-size: 13px;
  color: var(--van-text-color-2);
  border-top: 1px solid var(--van-border-color);
  text-align: center;
}

.add-set-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px;
  border-top: 1px solid var(--van-border-color);
  color: var(--van-primary-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.add-set-btn:active {
  opacity: 0.7;
}
</style>