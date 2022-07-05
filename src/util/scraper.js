import { get } from "axios";
import { load } from "cheerio";

const url = "https://www.arbeitnow.com/api/jobs?page=1&search=&sort_by=relevance&category=&tags=%5B%22javascript%22%5D&locale=en";

let paragraphSelector = "div.flex-col.flex-grow > div > div.flex.block.h-full > div.py-2.items-center > div:nth-child(3) > p";

let tagsSelector = "div.flex-col.flex-grow > div > div.flex.block.h-full > div.py-2.items-center > div:nth-child(4) button";

let trimText = text => text.replace(/(\\n)/g, "")

export async function fetchArbeitJobs() {
  var jobs = [];
  try {
    const { data: { data } } = await get(url);

    let $ = load(trimText(data));

    const listItems = $(".list-none");

    listItems.each((_idx, el) => {
      let jobLocation = trimText($(el).find(paragraphSelector).text()) ?? "";
      let anchorTag = $(el).find("div.items-center.hidden a");
      let href = anchorTag.attr("href") ?? "";
      let companyLogo = $(anchorTag).find("img").attr("src") ?? "";

      let title = $(el).find(".flex-col.flex-grow h2 > a").attr('title') ?? "";
      let content = $(el).find(".flex-col.flex-grow a");
      let companyName = $(content[1]).text().trim() ?? "";
      let { href: companyUrl } = content[1].attribs ?? "";

      let tags = [];
      $(el).find(tagsSelector).each((_idx, el) => tags.push(trimText($(el).text())) ?? "");

      jobs.push({
        title,
        jobUrl: href,
        applyUrl: `${href}/apply`,
        companyLogo,
        companyUrl,
        companyName,
        jobLocation,
        tags
      });
    });
  } catch (err) {
    console.error(err)
  }
  return jobs;
}

