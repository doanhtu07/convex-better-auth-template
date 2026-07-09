import { useState } from 'react'
import { useConvexMutation } from '@convex-dev/react-query'
import { api } from '@packages/convex/api'
import { useMutation } from '@tanstack/react-query'
import styles from './add-task.module.css'
import type { SubmitEventHandler } from 'react'
import { getTestId } from '@/utils/test-ids'

type Props = {
  'data-testid'?: string
}

export const AddTask = ({ 'data-testid': dataTestId }: Props) => {
  const [text, setText] = useState('')

  const addTask = useMutation({
    mutationFn: useConvexMutation(api.tasks.add),
  })

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    addTask.mutateAsync({ text: text.trim() }).then(() => setText(''))
  }

  // MARK: Renderers

  return (
    <form
      className={styles.root}
      onSubmit={handleSubmit}
      {...getTestId([dataTestId, 'root'])}
    >
      <input
        className={styles.input}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
        disabled={addTask.isPending}
        {...getTestId([dataTestId, 'input'])}
      />

      <button
        className={styles.button}
        type="submit"
        disabled={addTask.isPending || !text.trim()}
        {...getTestId([dataTestId, 'submit'])}
      >
        Add
      </button>
    </form>
  )
}
