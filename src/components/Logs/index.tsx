import { Table } from "@mantine/core";
import { colorMixer } from "src/util";

import { LogsPageProps } from "../../../types";

export const LogsComponent = ({ logs }: LogsPageProps) => {
  return (
    <Table
      highlightOnHover
      sx={(theme) => ({
        td: {
          color: colorMixer(theme).dark,
          "&.os": { color: colorMixer(theme, "grape", "pink").dark },
          "&.ip": { color: colorMixer(theme, "red", "orange").dark },
          "&.city": { color: colorMixer(theme, "violet", "lime").dark },
          "&.isBot": { color: colorMixer(theme, "green", "gray").dark },
          "&.browser": { color: colorMixer(theme, "cyan", "grape").dark },
          "&.country": { color: colorMixer(theme, "lime", "violet").dark },
        },
      })}
    >
      <thead>
        <tr>
          <th>Url</th>
          <th>Ip Address</th>
          <th>Time</th>
          <th>Country</th>
          <th>Region</th>
          <th>City</th>
          <th>Longitude</th>
          <th>Latitude</th>
          <th>Browser</th>
          <th>OS</th>
          <th>IsBot</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(({ url, ip, time, geo, ua }, index) => (
          <tr key={url + index}>
            <td className="url">{url}</td>
            <td className="ip">{ip}</td>
            <td className="time">{time}</td>
            <td className="country">{geo.country}</td>
            <td className="region">{geo.region}</td>
            <td className="city">{geo.city}</td>
            <td className="lng">{geo.longitude}</td>
            <td className="lat">{geo.latitude}</td>
            <td className="browser">{ua.browser.name}</td>
            <td className="os">{ua.os.name}</td>
            <td className="isBot">{String(ua.isBot)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
