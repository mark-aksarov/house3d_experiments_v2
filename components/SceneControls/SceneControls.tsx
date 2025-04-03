import Stack from '@/uikit/Stack';
import classNames from 'classnames';
import Tooltip from '@/uikit/Tooltip';
import SceneButton from '../SceneButton';
import styles from './SceneControls.module.scss';
import { useThree } from '@/context/ThreeContext';
import { FocusIcon, MinusIcon, PlusIcon } from 'lucide-react';

export default function SceneControls() {
  const { getCamera, render } = useThree();

  const zoomIn = () => {
    const camera = getCamera();

    if (camera.zoom < 1.5) {
      camera.zoom += 0.1;
      camera.updateProjectionMatrix();
      render();
    }
  }

  const zoomOut = () => {
    const camera = getCamera();

    if (camera.zoom > 0.75) {
      camera.zoom -= 0.1;
      camera.updateProjectionMatrix();
      render();
    }
  }

  const resetZoom = () => {
    const camera = getCamera();
    camera.zoom = 1;
    camera.updateProjectionMatrix();
    render();
  }

  return (
    <>
      <div className={classNames(styles.sceneControls, styles.mobile)}>
        <Stack direction="vertical" spacing={5}>
          <SceneButton
            aria-label='Zoom in'
            color="neutral"
            size="regular"
            icon={<PlusIcon />}
            className={styles.button}
            onClick={zoomIn}
          />
          <SceneButton
            aria-label='Zoom out'
            color="neutral"
            size="regular"
            icon={<MinusIcon />}
            className={styles.button}
            onClick={zoomOut}
          />
          <SceneButton
            aria-label='Reset zoom'
            color="neutral"
            size="regular"
            icon={<FocusIcon />}
            className={styles.button}
            onClick={resetZoom}
          />
        </Stack>
      </div>

      <div className={classNames(styles.sceneControls, styles.desktop)}>
        <Stack direction="vertical" spacing={5}>
          <Tooltip title="Zoom in" placement='left'>
            <SceneButton
              aria-label='Zoom in'
              color="neutral"
              size="regular"
              icon={<PlusIcon />}
              className={styles.button}
              onClick={zoomIn}
            />
          </Tooltip>
          <Tooltip title="Zoom out" placement='left'>
            <SceneButton
              aria-label='Zoom out'
              color="neutral"
              size="regular"
              icon={<MinusIcon />}
              className={styles.button}
              onClick={zoomOut}
            />
          </Tooltip>
          <Tooltip title="Reset zoom" placement='left'>
            <SceneButton
              aria-label='Reset zoom'
              color="neutral"
              size="regular"
              icon={<FocusIcon />}
              className={styles.button}
              onClick={resetZoom}
            />
          </Tooltip>
        </Stack>
      </div>
    </>
  )
}