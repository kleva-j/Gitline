import { Autocomplete, Text, Group, Avatar, Grid, Button } from "@mantine/core";
import { useState, useEffect, forwardRef } from "react";
import { colorMixer, timer } from "src/util";
import { BiSearch } from "react-icons/bi";

import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ?? ""
);

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  img: string;
  title: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, img, title, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others} key={id}>
      <Group noWrap>
        <Avatar src={img} />
        <div>
          <Text size="sm">{title}</Text>
          <Text size="xs" color="dimmed" lineClamp={1}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Text>
        </div>
      </Group>
    </div>
  )
);

SelectItem.displayName = "SelectItems";

interface SearchBarProps {}

const index = searchClient.initIndex("dev_jobs");
const searchIndex = timer((search, params, callback) => {
  index
    .search(search, {
      ...params,
      page: 0,
      hitsPerPage: 15,
      snippetEllipsisText: "…",
      distinct: 1,
    })
    .then(({ hits }) => callback(hits));
}, 100);

export const SearchBar = (props: SearchBarProps) => {
  const [filteredResults, setFilteredResults] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search && search !== "") {
      searchIndex(search, {}, (hits: any) => {
        setFilteredResults(
          hits.map(({ id, logo, title, jobtype, description }: any) => ({
            id,
            jobtype,
            title,
            img: logo,
            description: description.slice(0, 50),
          }))
        );
      });
    } else {
      setFilteredResults([]);
    }
  }, [search]);

  return (
    <Grid columns={12} grow sx={{ maxWidth: 800 }}>
      <Grid.Col span={10}>
        <Autocomplete
          size="md"
          radius="md"
          limit={4}
          value={search}
          onChange={setSearch}
          placeholder="Search for jobs"
          icon={<BiSearch size={18} />}
          data={filteredResults}
          itemComponent={SelectItem}
          nothingFound="Nothing Found!"
          filter={(value, item) =>
            item.title
              .toLowerCase()
              .includes(
                value.toLowerCase().trim() ||
                  item.description
                    .toLowerCase()
                    .includes(value.toLowerCase().trim())
              )
          }
        />
      </Grid.Col>
      <Grid.Col span={2}>
        <Button
          sx={(theme) => ({
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
          radius="md"
          size="md"
        >
          Search
        </Button>
      </Grid.Col>
    </Grid>
  );
};
