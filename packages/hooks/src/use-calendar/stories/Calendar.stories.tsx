import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Text, Button, List } from "@stewed/react";
// Hooks
import { useCalendar } from "../index";

type Story = StoryObj<typeof useCalendar>;

const meta: Meta<typeof useCalendar> = {
  title: "Hooks/useCalendar",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Base: Story = {
  render: function Render() {
    const { data } = useCalendar();

    return <Text as={"pre"}>{JSON.stringify(data, null, 4)}</Text>;
  },
};

export const Methods: Story = {
  render: function Render() {
    const { data, prevMonth, nextMonth, prevYear, nextYear } = useCalendar();

    return (
      <>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Button onClick={prevYear}>Prev Year</Button>
          <Button onClick={prevMonth}>Prev Month</Button>
          <Text>
            {data?.month} {data?.year}
          </Text>
          <Button onClick={nextMonth}>Next Month</Button>
          <Button onClick={nextYear}>Next Year</Button>
        </div>
      </>
    );
  },
};

export const WeekDays: Story = {
  render: function Render() {
    const { data } = useCalendar();

    return <List>{data?.weekDays.map((week) => <List.Item key={week}>{week}</List.Item>)}</List>;
  },
};
