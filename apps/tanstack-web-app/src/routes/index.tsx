import { createFileRoute } from '@tanstack/react-router'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import styles from '@/styles/home.module.css'
import { getTestId } from '@/utils/test-ids'
import { Button } from '@/components/button/button'
import { Divider } from '@/components/divider/divider'
import { useTheme } from '@/providers/theme-provider'

const TEST_ID_ROOT = 'home'

const Home = observer(() => {
  const { t } = useTranslation('ns_home')
  const { toggleTheme, setTheme } = useTheme()

  // MARK: Renderers

  return (
    <main className={styles.root} {...getTestId([TEST_ID_ROOT, 'root'])}>
      <p>{t('t_welcomeMessage')}</p>

      <Divider />

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
    </main>
  )
})

// MARK: Route

export const Route = createFileRoute('/')({
  component: Home,
})
