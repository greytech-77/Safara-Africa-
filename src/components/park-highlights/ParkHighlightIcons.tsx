import type { SVGProps } from 'react';

/**
 * Scene icons for the park highlights strips.
 * Style: 64x64 grid, 1.5 rounded stroke, no fill, one colour via `currentColor`.
 * Colour comes from a text class (e.g. text-[#8a5a10]). Looks best at 56-64px.
 */
export type SceneIconProps = SVGProps<SVGSVGElement> & { size?: number };

function SceneIcon({ size = 60, children, ...rest }: SceneIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Elephant walking under a baobab */
export function ElephantBaobabIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M36 56V36Q36 31 32 28.5Q29.5 27 27 27.5" />
      <path d="M45 56V36Q45 31 49 28.5Q51.5 27 54 27.5" />
      <path d="M32 28.5Q30.5 24.5 29 22M49 28.5Q50.5 24.5 52 22" />
      <path d="M38.5 33Q37.5 25 33 19Q31.5 16 28.5 15M33 19Q34.5 16 34.5 13" />
      <path d="M42.5 33Q43.5 25 48 19Q49.5 16 52.5 15M48 19Q46.5 16 46.5 13" />
      <path d="M40.5 32V11M40.5 17Q42.5 14.5 44 14" />
      <path d="M38.5 42h4M39.5 47h4" />
      <path d="M31 44C31 38 27 35 21 35C17 35 14 36 12.5 38C10 39 9 42 9 45C9 49 8 52 6 53.5Q5.5 55 7 55" />
      <path d="M12 46C12 49 11.2 51.5 9.6 53.4" />
      <path d="M14 38.5C17.5 37 21 39.5 20.3 44C19.8 47 16.5 47.8 14.6 46.2" />
      <path d="M11.3 46.6Q12.8 48.6 14.8 48" />
      <path d="M15 47V56M19.5 48V56M25 48.5V56M29.5 46.5V56" />
      <path d="M19.5 49C21.5 50 23.5 50 25 49" />
      <path d="M31 44C31 45 30.5 46 29.5 46.5" />
      <path d="M31 40.5Q33.2 42.5 32.6 46" />
      <path d="M3 56.5H60" />
      <circle cx="11.6" cy="40.6" r="0.9" fill="currentColor" stroke="none" />
    </SceneIcon>
  );
}

/** Lilac-breasted roller on an acacia branch */
export function RollerBirdIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M31 23C25 26 21 32 20 38L15.5 47" />
      <path d="M41 24.5C42 32 36 38 27 40L19.5 43" />
      <path d="M30.9 22.9A5.5 5.5 0 1 1 41.2 24.6" />
      <path d="M41.6 19.8L46.5 21.6L41.4 23.6" />
      <path d="M15.5 47L19.5 43" />
      <path d="M16.3 46L11.5 57M18 45L14.5 57.5" />
      <path d="M28.5 29C26 33 24 36 23 40" />
      <path d="M8 45Q30 40 58 44" />
      <path d="M48 42.6l2-3M53.5 43.2l1.2 3M40 42.5l-1.5-2.8" />
      <path d="M29 40V42.4M33 38.6V41.8" />
      <path d="M44 9q2.5-2.5 5 0q2.5-2.5 5 0M50 16q1.8-1.8 3.6 0q1.8-1.8 3.6 0" />
      <circle cx="37.6" cy="20.6" r="0.9" fill="currentColor" stroke="none" />
    </SceneIcon>
  );
}

/** Heron wading among cattails */
export function HeronSwampIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M32 26.5C27 24.8 20 27 14.5 33.5C21 34.5 28 34 31.5 31.5C33.6 30 33.8 27.9 32 26.5" />
      <path d="M19.5 30.2C23 29.2 27 29.3 30 30.3" />
      <path d="M32 26.5C34.5 23 30 20 32 16C33 13.5 35 12.5 37 13C38.5 13.2 39.3 14 39.3 15" />
      <path d="M39.3 15L47 16.5L38.5 17.2C37 17.5 35.6 16.8 35.2 15.6" />
      <circle cx="37.3" cy="14.8" r="0.9" fill="currentColor" stroke="none" />
      <path d="M23 33.8L21 47.5M27 33.6L28.5 47" />
      <path d="M17.5 48.2q5.5 2 13.5-.4" />
      <path d="M16.5 45.3C10.5 46 8 48 8 50.5C8 54 18 56 32 56C45 56 56 54 56 50.5C56 48.5 53 46.8 48.5 46" />
      <path d="M13 51.8q2-1.5 4 0t4 0M34 51.3q2-1.5 4 0t4 0" />
      <path d="M47.5 46.5V30M47.5 24V21" />
      <rect x="46.1" y="24" width="2.8" height="6" rx="1.4" />
      <path d="M52.5 47V34M52.5 28V25.5" />
      <rect x="51.1" y="28" width="2.8" height="6" rx="1.4" />
      <path d="M44 46Q43 38 40 34M55.5 47Q57 40 60 37" />
    </SceneIcon>
  );
}

/** Dry-season sunset behind an acacia */
export function DrySeasonSunsetIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M11 48A9 9 0 0 1 29 48" />
      <path d="M8.4 44.9L5 44M12.3 38.8L10 36.1M20 36V32.5M27.7 38.8L30 36.1M31.6 44.9L35 44" />
      <path d="M4 48H60" />
      <path d="M44 48V38.5M44 38.5Q41.5 34 37.5 31M44 38.5Q46.5 34 50.5 31M44 38.5V31" />
      <path d="M30 31C31.5 28 34.5 27 37.5 27.5C41 25.8 47 25.8 50.5 27.5C53.5 27 56.5 28 58 31H30" />
      <path d="M9.5 56Q9.8 53 8.3 51M11 56V51.2M12.5 56Q12.2 53 13.7 51M48.5 56.5Q48.8 53.5 47.3 51.5M50 56.5V51.7M51.5 56.5Q51.2 53.5 52.7 51.5" />
    </SceneIcon>
  );
}

/** Wildebeest head inside a migration loop */
export function WildebeestMigrationIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M27.4 20.4C23 17.6 16.6 17.4 14.6 21.6C13.6 24 15.2 26.2 17.4 24.8" />
      <path d="M36.6 20.4C41 17.6 47.4 17.4 49.4 21.6C50.4 24 48.8 26.2 46.6 24.8" />
      <path d="M27 20C29 18.5 35 18.5 37 20" />
      <path d="M30 18.8l-1-2.6M32 18.4V15.6M34 18.8l1-2.6" />
      <path d="M27 21C26.5 28 27 36 27.5 42C26.5 44 27 47.5 29.5 48H34.5C37 47.5 37.5 44 36.5 42C37 36 37.5 28 37 21" />
      <path d="M29.6 45.2q.8-.9 1.6 0M32.8 45.2q.8-.9 1.6 0" />
      <path d="M26.9 25.8C23.6 25.4 21.4 27 20.8 29.6C23.4 30 25.5 29.2 26.9 28.2" />
      <path d="M37.1 25.8C40.4 25.4 42.6 27 43.2 29.6C40.6 30 38.5 29.2 37.1 28.2" />
      <circle cx="29" cy="29.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="35" cy="29.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M30 48.6l-.6 4.2M32 48.7V53.4M34 48.6l.6 4.2" />
      <path d="M17.4 53.9A25.5 25.5 0 1 1 46.6 53.9" strokeDasharray="4 3.2" />
      <path d="M46.6 53.9L50.2 53.9M46.6 53.9L47.9 50.5" />
    </SceneIcon>
  );
}

/** Laurel wreath around an acacia (World Heritage) */
export function HeritageEmblemIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M25.5 50.9L22.5 49.5L19.8 47.6L17.4 45.2L15.5 42.5L14.1 39.5L13.3 36.3L13 33L13.3 29.7L14.1 26.5L15.5 23.5L17.4 20.8L19.8 18.4L22.5 16.5L25.5 15.1" />
      <path d="M19.7 47.3Q21 44.6 19 42.3Q17.8 45 19.7 47.3" />
      <path d="M19.5 47.6Q16.9 46.1 14.5 47.7Q17 49.3 19.5 47.6" />
      <path d="M15.6 42.2Q17.7 40.1 16.6 37.3Q14.6 39.4 15.6 42.2" />
      <path d="M15.3 42.4Q13.4 40.1 10.5 40.9Q12.4 43.2 15.3 42.4" />
      <path d="M13.4 36Q16.1 34.8 16.1 31.8Q13.4 33.1 13.4 36" />
      <path d="M13.1 36.1Q12.1 33.3 9.1 33Q10.1 35.8 13.1 36.1" />
      <path d="M13.5 29.5Q16.5 29.2 17.5 26.4Q14.5 26.7 13.5 29.5" />
      <path d="M13.1 29.4Q13.2 26.5 10.5 25.2Q10.4 28.2 13.1 29.4" />
      <path d="M15.8 23.4Q18.7 24.2 20.6 21.9Q17.7 21.1 15.8 23.4" />
      <path d="M15.5 23.2Q16.5 20.4 14.4 18.3Q13.4 21.1 15.5 23.2" />
      <path d="M20.1 18.5Q22.5 20.1 25.1 18.6Q22.6 16.9 20.1 18.5" />
      <path d="M19.8 18.1Q21.8 15.9 20.5 13.2Q18.6 15.4 19.8 18.1" />
      <path d="M38.5 50.9L41.5 49.5L44.2 47.6L46.6 45.2L48.5 42.5L49.9 39.5L50.7 36.3L51 33L50.7 29.7L49.9 26.5L48.5 23.5L46.6 20.8L44.2 18.4L41.5 16.5L38.5 15.1" />
      <path d="M44.5 47.6Q47 49.3 49.5 47.7Q47.1 46.1 44.5 47.6" />
      <path d="M44.3 47.3Q46.2 45 45 42.3Q43 44.6 44.3 47.3" />
      <path d="M48.7 42.4Q51.6 43.2 53.5 40.9Q50.6 40.1 48.7 42.4" />
      <path d="M48.4 42.2Q49.4 39.4 47.4 37.3Q46.3 40.1 48.4 42.2" />
      <path d="M50.9 36.1Q53.9 35.8 54.9 33Q51.9 33.3 50.9 36.1" />
      <path d="M50.6 36Q50.6 33.1 47.9 31.8Q47.9 34.8 50.6 36" />
      <path d="M50.9 29.4Q53.6 28.2 53.5 25.2Q50.8 26.5 50.9 29.4" />
      <path d="M50.5 29.5Q49.5 26.7 46.5 26.4Q47.5 29.2 50.5 29.5" />
      <path d="M48.5 23.2Q50.6 21.1 49.6 18.3Q47.5 20.4 48.5 23.2" />
      <path d="M48.2 23.4Q46.3 21.1 43.4 21.9Q45.3 24.2 48.2 23.4" />
      <path d="M44.2 18.1Q45.4 15.4 43.5 13.2Q42.2 15.9 44.2 18.1" />
      <path d="M43.9 18.5Q41.4 16.9 38.9 18.6Q41.5 20.1 43.9 18.5" />
      <path d="M22 43H42" />
      <path d="M32 43V33M32 36.5L28.5 33M32 36.5L35.5 33" />
      <path d="M23.5 33C25 30.5 28 29.6 30.5 30C32.5 29 36 29.2 38 30.2C40 30 42 31 42.5 33H23.5" />
      <circle cx="32" cy="21.5" r="3" />
      <path d="M27.5 50L36.5 56M36.5 50L27.5 56" />
    </SceneIcon>
  );
}

/** Kopje rocks, acacia and a winding river */
export function KopjeRiverIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M4 42H13M43 42H60" />
      <path d="M13 42C13 36 17 33 22 34C24 30 30 29.5 33 33C37 32 42 35 43 42" />
      <path d="M22 34C23 37 23.2 39.5 22.4 42M33 33C32 36 32.5 39 33.6 42" />
      <path d="M27.5 31.5V28.6M27.5 28.6L25.9 27M27.5 28.6L29.1 27" />
      <path d="M23.5 26.7C25.1 24.9 29.9 24.9 31.5 26.7Z" />
      <path d="M51 42V35M51 37.5L48 34.5M51 37.5L54 34.5" />
      <path d="M45 34.5C46.5 32.5 55.5 32.5 57 34.5H45" />
      <path d="M6 57C14 52 26 55 32 50C35.5 47 40 45.5 45 45" />
      <path d="M20 60C28 57 38 59 44 53.5C47.5 50.5 52 48.5 58 47.5" />
      <path d="M8 47.5l1.2-3 1.2 3M56 54l1.2-3 1.2 3" />
    </SceneIcon>
  );
}

/** Giraffe under sun and moon (all year) */
export function GiraffeYearRoundIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M40 34L45.5 16.5" />
      <path d="M36.5 33L42 15.5" />
      <path d="M42 15.5C43 13 46 12 48.5 13L53 15.5C54 16.5 53.5 17.8 52 17.6L46.5 17L45.5 16.5" />
      <path d="M44 13.2V10.4M46.6 12.6V9.8" />
      <path d="M43 14.2L40 13" />
      <circle cx="47.2" cy="14.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M36.5 33C32 31.5 26 32 22 34C20.5 35 20 37 20.5 39C21 40.5 22 41.5 23 42" />
      <path d="M23 42C28 43 34 43 38.5 41.5C41 39.5 41 36.5 40 34" />
      <path d="M23.5 42V56M27 42.6V56M35 42.8V56M38.5 41.6V56" />
      <path d="M20.6 35.6Q18 39 18.6 44" />
      <path d="M27 36.5h3M32.5 37.5h3M29.5 39.6h3" />
      <circle cx="13" cy="16" r="3.5" />
      <path d="M13 9.5V10.8M13 21.2V22.5M6.5 16H7.8M18.2 16H19.5M8.4 11.4L9.3 12.3M16.7 19.7L17.6 20.6M17.6 11.4L16.7 12.3M8.4 20.6L9.3 19.7" />
      <path d="M30.5 6.2A4.3 4.3 0 1 0 31.6 13.6A3.4 3.4 0 0 1 30.5 6.2" />
      <path d="M4 56.5H60" />
    </SceneIcon>
  );
}

/** Dashed boundary around hills and an acacia */
export function ConservationAreaIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path
        d="M10 31C8.5 20 18 10.5 30.5 11C44 11.5 55.5 18.5 54.5 31.5C53.5 44 45 54 31.5 54C18.5 54 11.3 43 10 31Z"
        strokeDasharray="3 3.5"
      />
      <path d="M15.5 41C19.5 35 25 34.5 29.5 38.5C33 35 38.5 34 43.5 38.5C45.5 40 47.5 41 49.5 41" />
      <path d="M17 45.5H47" />
      <path d="M37 34V27M37 29.5L34.5 26.5M37 29.5L39.5 26.5" />
      <path d="M31.5 26.5C33 24.5 41 24.5 42.5 26.5H31.5" />
      <path d="M22 26.5l1.5-1.5 1.5 1.5 1.5-1.5 1.5 1.5" />
    </SceneIcon>
  );
}

/** Crater bowl with a lake on its floor */
export function CraterIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M4 34C8 34 12 30 16 24C18 21 21 21 22.5 24C25 31 27 44 32 44H38C43 44 45 32 47 25C48.5 21 52 21 54 24C56 28 58 33 61 34" />
      <path d="M29.5 44C31.5 41.4 38.5 41.4 40.5 44" />
      <path d="M24.6 31l3 .8M24.2 36.5l3.4.6M45.6 31l-3 .8M46 36.5l-3.4.6" />
      <path d="M33 44V40.5M31.6 40.8C32.2 40 33.8 40 34.4 40.8H31.6" />
      <path d="M8 50C20 47.5 44 47.5 56 50" />
      <path d="M14 55C24 53 40 53 50 55" />
      <path d="M24 13c1-2.6 4.6-2.8 5.8-.6c1.4-1.6 4.4-1.2 4.8 1h-10.6" />
      <path d="M40 9c.8-2 3.6-2.2 4.6-.5c1.1-1.3 3.4-1 3.8.8H40" />
    </SceneIcon>
  );
}

/** Steep crater wall with a height marker */
export function CraterWallsIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M4 13H15C17 13 18 16 19.2 20C20.6 25.5 22.6 28 23.6 33.5C24.8 39.5 27 43.5 30.5 45.5C34.5 47.5 41 47.5 46 47.5" />
      <path d="M16.6 18.5l-3.4 1M20.2 27.5l-3.2 1M23.6 37.5l-3.2 1" />
      <path d="M8.5 13V10.1M8.5 10.1L6.9 8.5M8.5 10.1L10.1 8.5" />
      <path d="M4 8.2C5.8 6.4 11.2 6.4 13 8.2Z" />
      <path d="M50 14.5V45.5" />
      <path d="M47.5 17L50 14.5L52.5 17M47.5 43L50 45.5L52.5 43" />
      <path d="M46 12H54M46 48H54" />
      <path d="M23 16h9M27 20h8" />
      <path d="M4 52H40M10 56H34" />
    </SceneIcon>
  );
}

/** Flamingo on one leg at the lake shore */
export function FlamingoShoreIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M40 28C36 24.5 28 24.5 23 28.5C21 30 21.5 33 24 33.5C29 34.5 36 33 40 28" />
      <path d="M23 28.6L18.8 29.4" />
      <path d="M27 29.6C31 28.5 35 28.5 38 29.3" />
      <path d="M38.6 26.4C42 22 40 16.5 36.2 13.2C33.4 10.6 34.2 6 38 6C41 6 42.6 8 42.2 10.6" />
      <path d="M42.2 10.6L41 14.4C40.6 15.3 39.5 15.2 39.3 14.2L39.8 11.2" />
      <circle cx="39.4" cy="8.3" r="0.9" fill="currentColor" stroke="none" />
      <path d="M30.5 34V50" />
      <path d="M33.6 34L37.2 39.6L32.6 40.6" />
      <path d="M24.5 50.6q3 1.6 6.5 0q3-1.6 6.5 0" />
      <path d="M4 50H20M41 50H60" />
      <path d="M8 54.5q2-1.5 4 0t4 0M42 55q2-1.5 4 0t4 0" />
      <path d="M50 50Q49 45 46.5 42M53 50V41M56 50Q57 45 59.5 42M8 50Q7 45.5 4.5 43M11 50V42.5M14 50Q15 46 17 44" />
    </SceneIcon>
  );
}

/** Rift Valley escarpment above a lake */
export function RiftLakeIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M4 15H17L20.5 21L23 29L27 33.5L29.5 40" />
      <path d="M15.6 19.5h4M19 26l3.4.4M22.4 32.5l3.4.4" />
      <path d="M8.5 15V12.6M8.5 12.6L6.9 11M8.5 12.6L10.1 11" />
      <path d="M4.9 10.7C6.3 8.9 10.7 8.9 12.1 10.7Z" />
      <path d="M14 15V13.2M14 13.2L12.4 11.6M14 13.2L15.6 11.6" />
      <path d="M11 11.3C12.2 9.5 15.8 9.5 17 11.3Z" />
      <path d="M29.5 40C38 38 50 37.5 60 39" />
      <path d="M26 52C36 55 50 54 60 50" />
      <path d="M34 45.5q2-1.5 4 0t4 0M46 48.5q2-1.5 4 0t4 0" />
      <path d="M42 25q1.5-1.6 3 0q1.5-1.6 3 0M50 30q1.2-1.3 2.4 0q1.2-1.3 2.4 0" />
      <path d="M4 56C10 52 18 50 26 52" />
    </SceneIcon>
  );
}

/** Safari boat on the river with a palm */
export function BoatSafariIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M8 41H44C42 46 38.5 47.5 34.5 47.5H17C13 47.5 9.8 45.4 8 41Z" />
      <path d="M13 31H39M11 33.2L13 31M41 33.2L39 31" />
      <path d="M15 31V41M37 31V41" />
      <circle cx="22" cy="37.5" r="1.8" />
      <circle cx="29" cy="37.5" r="1.8" />
      <path d="M4 52q3-2 6 0t6 0M28 54q3-2 6 0t6 0M44 50q3-2 6 0t6 0" />
      <path d="M52 44C51.4 34 51.8 25 53 16" />
      <path d="M53 16C50 13 46 13 43.5 15M53 16C51.5 11.5 48.5 9.5 45.5 9.5M53 16C55 12 57.5 10.5 60 11M53 16C56 15 58.5 16 60 18.5M53 16C53.5 12.5 53 9.5 51.5 7.5" />
    </SceneIcon>
  );
}

/** A single safari vehicle on an empty plain */
export function LoneJeepIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M10 43V35H18L20.5 30H42V35H48V43" />
      <path d="M18 25H42M20 25V30M40 25V30" />
      <path d="M31 30V35M20.5 30V35" />
      <circle cx="17" cy="44" r="4" />
      <circle cx="41" cy="44" r="4" />
      <path d="M21 43H37M10 43H13M45 43H48" />
      <path d="M48 36.5h2.5v5H48" />
      <path d="M4 48.5H60" />
      <path d="M54 48.5V42M54 44L51.5 41M54 44L56.5 41" />
      <path d="M49.5 41C50.6 39.6 57.4 39.6 58.5 41H49.5" />
    </SceneIcon>
  );
}

/** Road to the horizon with a signpost */
export function RoadDistanceIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M14 58L29 34M50 58L35 34" />
      <path d="M32 55V51M32 46.5V43.5M32 39.5V37.5" />
      <path d="M4 34H60" />
      <path d="M38 34C42 29.5 46 28.5 52 34M46 30.5C49 26 54 26 58 31" />
      <path d="M10 52V20" />
      <path d="M10 22H21L24.5 25.5L21 29H10" />
      <circle cx="47" cy="16" r="3.5" />
    </SceneIcon>
  );
}

/** Cape buffalo head */
export function BuffaloHeadIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M24 22.5C19 21 14 23.5 11.5 27C10 29 7.4 28 7.4 24.5C7.4 22.5 8.4 21 9.6 20" />
      <path d="M40 22.5C45 21 50 23.5 52.5 27C54 29 56.6 28 56.6 24.5C56.6 22.5 55.6 21 54.4 20" />
      <path d="M24 22.5C24.5 20 27 18.8 32 18.8C37 18.8 39.5 20 40 22.5" />
      <path d="M24 22.5C28 19.5 36 19.5 40 22.5" />
      <path d="M24.2 24C23.2 31 25 38 26.2 43.5C27.2 48.6 36.8 48.6 37.8 43.5C39 38 40.8 31 39.8 24" />
      <path d="M23.8 26C19.5 26.2 16 28.8 14.6 32.6C18.2 33 21.4 31.4 23.6 29.4" />
      <path d="M40.2 26C44.5 26.2 48 28.8 49.4 32.6C45.8 33 42.6 31.4 40.4 29.4" />
      <circle cx="27.6" cy="31" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="36.4" cy="31" r="0.9" fill="currentColor" stroke="none" />
      <path d="M27.6 41C30 40 34 40 36.4 41" />
      <path d="M29.6 44.2q1-1 2 0M32.4 44.2q1-1 2 0" />
      <path d="M14 56H50" />
    </SceneIcon>
  );
}

/** Waterfall into a pool */
export function WaterfallIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M4 14H24C25 14 25.5 15 25.5 16.5V40" />
      <path d="M60 14H40C39 14 38.5 15 38.5 16.5V40" />
      <path d="M28 14C29 22 28 30 29 41M32 14C33 23 31.5 32 32.5 43M36 14C37 22 35.5 31 36 41" />
      <path d="M8 48C14 43 50 43 56 48C50 53 14 53 8 48" />
      <path d="M22.5 41.5l-2.4-2.4M41.5 41.5l2.4-2.4M18 48h6M38 49h7" />
      <path d="M12 14V11.1M12 11.1L10.4 9.5M12 11.1L13.6 9.5" />
      <path d="M7.5 9.2C9.3 7.4 14.7 7.4 16.5 9.2Z" />
      <path d="M52 14V11.6M52 11.6L50.4 10M52 11.6L53.6 10" />
      <path d="M48 9.7C49.6 7.9 54.4 7.9 56 9.7Z" />
      <path d="M4 40H25.5M38.5 40H60" />
    </SceneIcon>
  );
}

/** Wildflower and leaves */
export function WildflowersIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M32 56C32 46 30.5 36 32 22.5" />
      <ellipse cx="32" cy="11.8" rx="2.4" ry="3.8" transform="rotate(0 32 11.8)" />
      <ellipse cx="36" cy="14.7" rx="2.4" ry="3.8" transform="rotate(72 36 14.7)" />
      <ellipse cx="34.5" cy="19.4" rx="2.4" ry="3.8" transform="rotate(144 34.5 19.4)" />
      <ellipse cx="29.5" cy="19.4" rx="2.4" ry="3.8" transform="rotate(216 29.5 19.4)" />
      <ellipse cx="28" cy="14.7" rx="2.4" ry="3.8" transform="rotate(288 28 14.7)" />
      <circle cx="32" cy="16" r="1.9" />
      <path d="M31.4 40C26 40 21 36 19 31C25 31 29.4 34 31.4 40" />
      <path d="M31.4 40L23.5 33.6" />
      <path d="M32.2 31.5C37 30.6 42 27 44 22C38.4 22.2 34.2 26 32.2 31.5" />
      <path d="M32.2 31.5L41 24.6" />
      <path d="M31.6 47C36 45.5 40 42 41.4 38" />
      <ellipse cx="42.2" cy="35.6" rx="1.8" ry="2.8" transform="rotate(20 42.2 35.6)" />
      <path d="M18 56H46" />
      <path d="M20 56l-1.5-3.5M44 56l1.5-3.5" />
    </SceneIcon>
  );
}

/** Lion head above the river */
export function LionRiverIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M32 11.5A3.4 3.4 0 0 1 39.8 13.6A3.4 3.4 0 0 1 45.4 19.2A3.4 3.4 0 0 1 47.5 27A3.4 3.4 0 0 1 45.4 34.8A3.4 3.4 0 0 1 39.8 40.4A3.4 3.4 0 0 1 32 42.5A3.4 3.4 0 0 1 24.3 40.4A3.4 3.4 0 0 1 18.6 34.8A3.4 3.4 0 0 1 16.5 27A3.4 3.4 0 0 1 18.6 19.2A3.4 3.4 0 0 1 24.2 13.6A3.4 3.4 0 0 1 32 11.5" />
      <path d="M24.5 23.5C24.5 18.5 39.5 18.5 39.5 23.5C40.5 30 37.5 37.5 32 39.5C26.5 37.5 23.5 30 24.5 23.5" />
      <path d="M22.6 20.5A2.6 2.6 0 0 1 26.4 17.6M41.4 20.5A2.6 2.6 0 0 0 37.6 17.6" />
      <circle cx="28.3" cy="26.6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="35.7" cy="26.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M29.6 31.6H34.4L32 34.4Z" />
      <path d="M32 34.4V36.2M32 36.2C30.8 37.6 29.4 37.6 28.4 36.6M32 36.2C33.2 37.6 34.6 37.6 35.6 36.6" />
      <path d="M4 52q3-2 6 0t6 0t6 0t6 0t6 0t6 0t6 0t6 0t6 0" />
      <path d="M10 57.5q3-2 6 0t6 0t6 0t6 0t6 0t6 0t6 0" />
    </SceneIcon>
  );
}

/** Canoe on a lake below Mount Meru */
export function CanoeMeruIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M6 36L21 17.5L24.5 20L28 15.5L32 19.5L50 36" />
      <path d="M24.5 20L26.5 23.5L28 21.5L30 24.5" />
      <path d="M4 38H60" />
      <path d="M12 46C20 49.5 44 49.5 52 46C44 47.2 20 47.2 12 46" />
      <circle cx="31" cy="39.5" r="2" />
      <path d="M31 41.5V46.2" />
      <path d="M25 38.5L38.5 51.5" />
      <ellipse cx="39.4" cy="52.4" rx="1.4" ry="2.6" transform="rotate(-46 39.4 52.4)" />
      <path d="M6 54q3-2 6 0t6 0M44 55q3-2 6 0t6 0" />
      <path d="M44 12q1.5-1.6 3 0q1.5-1.6 3 0" />
    </SceneIcon>
  );
}

/** Black rhino beside a sanctuary fence */
export function BlackRhinoIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M50 34C46 30 38 29 32 30C29 30 27 31 25 33" />
      <path d="M25 33C22 33 19 34 16 37L11.5 40C10.4 41 10.8 42.6 12.2 42.6C15 43 18 43 20 42" />
      <path d="M12.2 40.3L8.4 33L14.6 38.4" />
      <path d="M16.6 36.6L15.6 32L19 35" />
      <path d="M24.6 33L24 29L26.6 31.6" />
      <circle cx="19.6" cy="37.2" r="0.9" fill="currentColor" stroke="none" />
      <path d="M20 42C22 44 24 45.5 26 46" />
      <path d="M28.5 47.2C34 48.6 42 48.6 46.5 47.2" />
      <path d="M50 34C53 37 53 43 50 46.4" />
      <path d="M26 46V55.5M30.5 47V55.5M43 47.6V55.5M47.5 46.6V55.5" />
      <path d="M51.6 37Q54 40 53.2 44" />
      <path d="M30 32.2C31 36 31 41 30 46" />
      <path d="M4 55.5H53" />
      <path d="M56 56V40M60 56V40M54.5 44.5H61M54.5 49.5H61" />
    </SceneIcon>
  );
}

/** Wildlife route crossing a border */
export function SharedRouteIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M32 6V58" strokeDasharray="3 3.5" />
      <path d="M7 48C16 40 22 46 32 38C42 30 48 36 57 27" />
      <path d="M7 48L12.4 47.4M7 48L8.6 42.8" />
      <path d="M57 27L51.6 27.6M57 27L55.4 32.2" />
      <path d="M15 30V24.6M15 24.6L13.4 23M15 24.6L16.6 23" />
      <path d="M9 22.7C11.4 20.9 18.6 20.9 21 22.7Z" />
      <path d="M48 18V14.6M48 14.6L46.4 13M48 14.6L49.6 13" />
      <path d="M43.5 12.7C45.3 10.9 50.7 10.9 52.5 12.7Z" />
      <path d="M4 30H24M40 18H58" />
    </SceneIcon>
  );
}

/** Small plane, then a boat */
export function PlaneBoatIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M10 18C14 16.5 30 16 34.5 17C36.6 17.5 36.6 19.6 34.5 20.1C30 21 14 20.5 10 18Z" />
      <path d="M12.5 17.6L9 11.5H12.4L17 17" />
      <path d="M21 19.4L24.6 25H27.6L26 19.6" />
      <path d="M37 15.2V22" />
      <path d="M28 18.3h3" />
      <path d="M37 24C43 28 46 33 47.5 38" strokeDasharray="0.1 3.4" />
      <path d="M4 40L13 31L18.5 35.5L26.5 27L39 40" />
      <path d="M4 40H60" />
      <path d="M40 47H56C55 50 53 51 50 51H45C42.6 51 41 49.6 40 47Z" />
      <path d="M43.5 47V43H52.5V47" />
      <path d="M8 50q3-2 6 0t6 0M20 56q3-2 6 0t6 0M44 57q3-2 6 0t6 0" />
    </SceneIcon>
  );
}

/** Walker with a stick */
export function OnFootIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <circle cx="29" cy="14.5" r="3.2" />
      <path d="M28.6 18.2L26.6 32" />
      <path d="M27.6 20.5C24 20 21.5 21.5 21.5 24.5V29.5C21.5 30.5 22.5 31 23.6 31H27" />
      <path d="M28 21.5L32.6 27.2L37.4 25.4" />
      <path d="M38.2 19.5L41.4 55" />
      <path d="M26.6 32L22.4 42.5L19.4 54M26.6 32L32 41.5L35.4 54" />
      <path d="M17 54H21.5M33.5 54H38" />
      <path d="M4 58C14 55 26 55 36 57.5C44 59.5 52 58 60 55" />
      <path d="M52 40V35.6M52 35.6L50.4 34M52 35.6L53.6 34" />
      <path d="M46.5 33.7C48.7 31.9 55.3 31.9 57.5 33.7Z" />
      <path d="M44 24q1.5-1.6 3 0q1.5-1.6 3 0" />
    </SceneIcon>
  );
}

/** Chimpanzee face */
export function ChimpFaceIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M20 30C18 18 24 11 32 11C40 11 46 18 44 30" />
      <path d="M19.6 26C15 24 12 27 13 31C14 34.5 17.5 35 20 33" />
      <path d="M44.4 26C49 24 52 27 51 31C50 34.5 46.5 35 44 33" />
      <path d="M20 33C21 42 26 48.5 32 48.5C38 48.5 43 42 44 33" />
      <path d="M32 22C29 18 23 19 23 25C23 29 25 31 26 33" />
      <path d="M32 22C35 18 41 19 41 25C41 29 39 31 38 33" />
      <path d="M25 25C27 23.4 30 23.4 31 25M33 25C34 23.4 37 23.4 39 25" />
      <circle cx="28" cy="27.8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="36" cy="27.8" r="0.9" fill="currentColor" stroke="none" />
      <path d="M26 33C26 38 28 43.5 32 43.5C36 43.5 38 38 38 33" />
      <circle cx="30.6" cy="34.6" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="33.4" cy="34.6" r="0.6" fill="currentColor" stroke="none" />
      <path d="M28.5 39.2C30.5 40.5 33.5 40.5 35.5 39.2" />
    </SceneIcon>
  );
}

/** Rain cloud with slanted rain over a sprout and grass (green season) */
export function GreenSeasonIcon(props: SceneIconProps) {
  return (
    <SceneIcon {...props}>
      <path d="M20 32H46A8 8 0 0 0 46.5 16A12 12 0 0 0 24.5 13.5A10 10 0 0 0 20 32Z" />
      <path d="M23 37.5L20.5 42.5M31 37.5L28.5 42.5M39 37.5L36.5 42.5M47 37.5L44.5 42.5" />
      <path d="M32 56V48.5M32 52.5Q27.5 52 26.5 47.5Q31 47.5 32 52.5M32 50.5Q36.5 50 37.5 45.5Q33 45.5 32 50.5" />
      <path d="M6 56H58" />
      <path d="M13.5 56Q13.8 53 12.3 51M15 56V51.2M16.5 56Q16.2 53 17.7 51M47.5 56Q47.8 53 46.3 51M49 56V51.2M50.5 56Q50.2 53 51.7 51" />
    </SceneIcon>
  );
}

export const sceneIcons = {
  elephantBaobab: ElephantBaobabIcon,
  roller: RollerBirdIcon,
  heronSwamp: HeronSwampIcon,
  drySeasonSunset: DrySeasonSunsetIcon,
  wildebeestMigration: WildebeestMigrationIcon,
  heritageEmblem: HeritageEmblemIcon,
  kopjeRiver: KopjeRiverIcon,
  giraffeYearRound: GiraffeYearRoundIcon,
  conservationArea: ConservationAreaIcon,
  crater: CraterIcon,
  craterWalls: CraterWallsIcon,
  flamingoShore: FlamingoShoreIcon,
  riftLake: RiftLakeIcon,
  boatSafari: BoatSafariIcon,
  loneJeep: LoneJeepIcon,
  roadDistance: RoadDistanceIcon,
  buffaloHead: BuffaloHeadIcon,
  waterfall: WaterfallIcon,
  wildflowers: WildflowersIcon,
  lionRiver: LionRiverIcon,
  canoeMeru: CanoeMeruIcon,
  blackRhino: BlackRhinoIcon,
  sharedRoute: SharedRouteIcon,
  planeBoat: PlaneBoatIcon,
  onFoot: OnFootIcon,
  chimpFace: ChimpFaceIcon,
  greenSeason: GreenSeasonIcon,
} as const;

export type SceneIconName = keyof typeof sceneIcons;
