import Radio from "@/uikit/Radio";
import Stack from "@/uikit/Stack";
import RadioGroup from "@/uikit/Radio/RadioGroup";
import { Theme, useTheme } from "@/context/ThemeContext";

export default function ToggleThemeRadioGroup() {
  const { theme, changeTheme } = useTheme();

  return (
    <Stack direction="vertical" spacing={4}>
      <RadioGroup
        value={theme || "auto"}
        name="theme"
        onChange={(value: string) => changeTheme(value === "auto" ? null : value as Theme)}
      >
        <Radio id="auto" value="auto" label="Auto" />
        <Radio id="light" value="light" label="Light" />
        <Radio id="dark" value="dark" label="Dark" />
      </RadioGroup>
    </Stack>
  );
}