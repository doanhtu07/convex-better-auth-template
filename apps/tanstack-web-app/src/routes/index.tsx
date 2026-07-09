import { createFileRoute } from '@tanstack/react-router'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { api } from '@packages/convex/api'
import { convexQuery } from '@convex-dev/react-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import styles from '@/styles/home.module.css'
import { getTestId } from '@/utils/test-ids'
import { Button } from '@/components/button/button'
import { Divider } from '@/components/divider/divider'
import { useTheme } from '@/providers/theme-provider'
import { AddTask } from '@/features/tasks/add-task/add-task'
import { Task } from '@/features/tasks/task/task'

const TEST_ID_ROOT = 'home'

const Home = observer(() => {
  const { t } = useTranslation('ns_home')
  const { toggleTheme, setTheme } = useTheme()
  const { data } = useSuspenseQuery(convexQuery(api.tasks.get, {}))

  // MARK: Renderers

  return (
    <main className={styles.root} {...getTestId([TEST_ID_ROOT, 'root'])}>
      <p>{t('t_welcomeMessage')}</p>

      <Divider spaceVertical="1rem" />

      <Button
        onClick={() => toggleTheme()}
        {...getTestId([TEST_ID_ROOT, 'toggleTheme'])}
      >
        <p>Toggle theme</p>
      </Button>

      <Button
        onClick={() => setTheme('system')}
        {...getTestId([TEST_ID_ROOT, 'systemTheme'])}
      >
        <p>System theme</p>
      </Button>

      <Divider spaceVertical="1rem" />

      <AddTask {...getTestId([TEST_ID_ROOT, 'addTask'])} />

      <div {...getTestId([TEST_ID_ROOT, 'tasks'])}>
        {data.map((task) => (
          <Task
            key={task._id}
            task={task}
            {...getTestId([TEST_ID_ROOT, 'task', task._id])}
          />
        ))}
      </div>
    </main>
  )
})

// MARK: Route

export const Route = createFileRoute('/')({
  component: Home,
})
