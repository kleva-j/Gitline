import {
  RangeSlider,
  Checkbox,
  Select,
  Group,
  InputWrapper,
} from "@mantine/core";
import { colorMixer } from "src/util";

export const JobFilters = () => {
  return (
    <Group>
      <Select
        placeholder="Job type"
        size="xs"
        data={[
          { value: "full-time", label: "Full time" },
          { value: "part-time", label: "Part time" },
          { value: "contractor", label: "Contractor" },
          { value: "internship", label: "Internship" },
        ]}
        clearable
      />

      <Select
        placeholder="Experience level"
        size="xs"
        data={[
          { value: "junior", label: "Junior" },
          { value: "mid-level", label: "Mid-level" },
          { value: "senior", label: "Senior" },
          { value: "lead", label: "Technical Lead" },
        ]}
        clearable
      />

      <InputWrapper
        id="input-demo"
        label="Salary range"
        // description="Please enter your credit card information, we need some money"
      >
        <RangeSlider
          min={25}
          max={130}
          step={15}
          showLabelOnHover={false}
          marks={[
            { value: 25, label: "25k" },
            { value: 130, label: "130k" },
          ]}
          size="xs"
          sx={(theme) => ({
            minWidth: 200,
            color: colorMixer(theme).dark,
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.blue[0],
            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.fn.lighten(theme.colors.blue[1], 0.09),
            },
          })}
        />
      </InputWrapper>
      <Checkbox label="Remote" size="xs" />
    </Group>
  );
};
