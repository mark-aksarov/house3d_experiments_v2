import Link from '@/uikit/Link';
import Stack from '@/uikit/Stack';
import Typography from '@/uikit/Typography';
import IconButton from '@/uikit/IconButton';
import styles from './AboutContent.module.scss';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

export default function AboutContent() {
  return (
    <Stack wrap="nowrap" direction="vertical" justifyContent="space-between" className={styles.aboutContent}>
      <Stack direction="vertical" spacing={9}>
        <Typography as="p" variant='body2'>
          This is an house web application that demonstrates real-time rendering of a 3D environment,
          allowing users to explore and interact with the scene dynamically.
        </Typography>

        <Typography as="p" variant='body2'>
          The application leverages modern web technologies, including WebGL, Three.js, and React, to provide a smooth and immersive experience.
        </Typography>

        <Typography as="p" variant='body2'>
          Users can navigate within the room, adjust the renderer, scene, and camera, and interact with objects in real time.
        </Typography>

        <Typography as="p" variant='body2'>
          It is designed for architectural visualization, house design previews, and interactive space planning.
        </Typography>
      </Stack>
      <Stack direction="vertical" spacing={5}>
        <Typography as="p" variant='body2'>
          Find useful links and contact details below:
        </Typography>

        <Stack spacing={4}>
          <IconButton
            variant='ghost'
            color='neutral'
            size='large'
            icon={<GithubIcon />}
          />
          <IconButton
            variant='ghost'
            color='neutral'
            size='large'
            icon={<LinkedinIcon />}
          />
          <IconButton
            variant='ghost'
            color='neutral'
            size='large'
            icon={<TwitterIcon />}
          />
        </Stack>

        <Typography as="p" variant='body2'>
          Have any inquiries? Reach out to me via <Link href="mailto:aksarov91@gmail.com">Email.</Link>
        </Typography>
      </Stack>
    </Stack>
  )
}