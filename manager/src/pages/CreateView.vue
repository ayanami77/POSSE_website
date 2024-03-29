<script setup lang="ts">
import { ref } from 'vue'
import { TNewQuiz } from '../types'
import { RepositoryFactory } from '../apis/RepositoryFactory'
import router from '../router'
import {
  QuizTextForm,
  ChoicesForm,
  CorrectChoiceForm,
  QuizImageForm,
  SupplementForm,
} from '../components/features/QuizForms'
import { Button } from '../components/features/common/partials'

const newQuiz = ref<TNewQuiz>({
  img: '',
  quiz_text: '',
  choices: [
    {
      isCorrect: true,
      name: '',
    },
    {
      isCorrect: false,
      name: '',
    },
    {
      isCorrect: false,
      name: '',
    },
  ],
  supplement_text: '',
  supplement_url: '',
})

/**
 * functions
 */
const convertImgIntoBase64 = (val: File) => {
  let fileReader = new FileReader()
  fileReader.readAsDataURL(val)
  fileReader.addEventListener('load', (e) => {
    const target = e.target
    if (target && typeof target.result === 'string') {
      newQuiz.value.img = target.result
    }
  })
}

const quizRepository = RepositoryFactory.get('quiz')
const submitNewQuiz = async (e: Event) => {
  e.preventDefault()

  const response = await quizRepository.create(newQuiz.value)
  if (response.status == 201) {
    alert(`status ${response.status}: 正常に問題を作成しました。`)
    router.push('/')
  } else {
    alert(`status ${response.status}: 問題の作成に失敗しました。`)
  }
}
</script>

<template>
  <div class="px-14 py-9 w-full">
    <h2 class="text-4xl font-bold">問題作成</h2>
    <form class="mt-8" @submit="submitNewQuiz">
      <dl>
        <!-- 問題文 -->
        <QuizTextForm v-model:quiz_text="newQuiz.quiz_text" />

        <!-- 選択肢 -->
        <ChoicesForm :choices="newQuiz.choices" />

        <!-- 正解の選択肢 -->
        <CorrectChoiceForm :choices="newQuiz.choices" />

        <!-- 問題の画像 -->
        <QuizImageForm
          :savedImg="newQuiz.img"
          @on-change-img="(val: File) => convertImgIntoBase64(val)"
        />

        <!-- 補足 -->
        <SupplementForm
          v-model:supplement_text="newQuiz.supplement_text"
          v-model:supplement_url="newQuiz.supplement_url"
        />
      </dl>
      <Button :width="`w-full`" :text="`作成`" :margin="true" />
    </form>
  </div>
</template>
