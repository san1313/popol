import Image from 'next/image';
import styles from '@/styles/CustomBadge.module.css';

export default function CustomBadge({ name, colorCode, logoColor, logoName }: {
  name: string,
  colorCode: string,
  logoColor: string,
  logoName?: string,
}) {
  return (
    <Image src={`https://img.shields.io/badge/${name}-${colorCode}.svg?&style=for-the-badge&logo=${logoName ? logoName : name}&logoColor=${logoColor}`} width={1000} height={1000} alt={name} className={styles.customBadge}/>
  )
}