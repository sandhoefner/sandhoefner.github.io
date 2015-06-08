//sans chelsea chel = 2;
var chel = 0;

json = [
  { 
    "born": new Date("1976-04-01"),
    "name": "Jason Sandhoefner",
    "age": 40,
    "gender": "m",
    "description": "Competitive arm wrestler. Manager at The Home Depot. Likes guns. Briefly studied architecture in community college, no degree.",
    "x": 1,
    "y": 5,
    "file": "jason"
  },
  { 
    "born": new Date("1984-12-14"),
    "name": "Kristen Sandhoefner",
    "age": 35,
    "gender": "f",
    "description":
    "Massage therapist. Enjoys things with zebra-print patterns on them. Very excited to be married, judging by her Instagram.",
    "x": 3,
    "y": 5,
    "file": "kristen"
  },
  { 
    "born": new Date("1977-04-19"),
    "name": "Shannon Senglaub",
    "age": 35,
    "gender": "f",
    "description":
    "Associate's degree in something like computer programming. Used to work for a company called Oncotech, which did cancer research. That was a long time ago.",
    "x": 5,
    "y": 5,
    "file": "shannon"
  },
  { 
    "born": new Date("1976-11-15"),
    "name": "Greg Senglaub",
    "age": 35,
    "gender": "m",
    "description":
    "High school history teacher. Took many years to graduate from CSULB while working at Ralph's or something. Teaches bad kids at bad schools. Cool guy.",
    "x": 7,
    "y": 5,
    "file": "greg"
  },
  { 
    "born": new Date("1985-10-29"),
    "name": "Erin Ketchum",
    "age": 29,
    "gender": "f",
    "description":
    "Elementary school teacher. BA in liberal studies from Chapman University. Teaches bad kids. Will be excited to meet you.",
    "x": 9,
    "y": 5,
    "file": "erin"
  },
  { 
    "born": new Date("1986-05-21"),
    "name": "Andrew Ketchum",
    "age": 29,
    "gender": "m",

    "description": "Shy. Quality assurance engineer at Broadcom, where your uncle also works, and which was recently acquired by Avago.",
    "x": 11,
    "y": 5,
    "file": "andrew"
  },
  { 
    "born": new Date("1989-05-09"),
    "name": "Corinne Lyons",
    "age": 25,
    "gender": "f",
    "description":
    "Master's degree (!!!) from CSUF, where she also got her bachelor's. Speech therapist working in schools - high schools, I think.",
    "x": 13,
    "y": 5,
    "file": "corinne"
  },
  { 
    "born": new Date("1983-05-09"),
    "name": "Scott Lyons",
    "age": 28,
    "gender": "m",
    "description":
    "Does some kind of insurance stuff at Travelers. Flies to Minnesota once in a while for business. Bachelor's from CSUF in business administration.",
    "x": 15,
    "y": 5,
    "file": "scott"
  },
  { 
    "born": new Date("1991-05-07"),
    "name": "Collin Sandhoefner",
    "age": 23,
    "gender": "m",
    "description":
    "Smart. Enjoys creative writing. Pursuing a bachelor's in mathematics from CSULB, but struggling to get back to it after taking time off.",
    "x": 17,
    "y": 5,
    "file": "collin"
  },
  { 
  "born": new Date("1992-05-02"),
    "name": "Chelsea Brown",
    "age": 23,
    "gender": "f",
    "description":
    "Goes to / went to CSULB. Enjoys smoking weed. Has worked at Sprouts & Lazy Dog Cafe. Relationship status with Collin presently unclear. Not expected to attend.",
    "x": 19,
    "y": 5,
    "file": "chelsea"
  },
  { 
    "born": new Date("1995-11-08"),
    "name": "Evan Sandhoefner",
    "age": 19,
    "gender": "m",
    "description":
    "Pursuing a BA in either economics or computer science at Harvard College. Loves you very much. Enjoys rock climbing and playing string instruments.",
    "x": 21-chel,
    "y": 5,
    "file": "evan"
  },
  { 
    "born": new Date("1995-01-31"),
    "name": "Amy Huang",
    "age": 20,
    "gender": "f",
    "description":
    "The most beautiful girl in the world. Kind and brilliant and pure of heart. Passionate about child mental health and emotional intelligence and housing the housingless.",
    "x": 23-chel,
    "y": 5,
    "file": "amy"
  },
  { 
    "born": new Date("1997-11-01"),
    "name": "Aidan Sandhoefner",
    "age": 17,
    "gender": "m",
    "description":
    "Graduating high school senior, to attend UC Davis in the fall. Plays baseball. Doesn't know what he wants to do with his life. Good at math?",
    "x": 25-chel,
    "y": 5,
    "file": "aidan"
  },
  { 
    "born": new Date("1997-01-08"),
    "name": "Megan Bulone",
    "age": 17,
    "gender": "f",
    "description":
    "A mystery. The youngest of four Bulones, all of whom went to Oxford. Her older siblings, from oldest to youngest: Daniel, Joe, and Anne-Marie.",
    "x": 27-chel,
    "y": 5,
    "file": "megan"
  },
  { 
    "born": new Date("2006-03-23"),
    "name": "Carter Senglaub",
    "age": 8,
    "gender": "m",
    "description": 
    "Currently attending elementary school. Enjoys cars, legos, and horseplay. Has yellow hair. Is eight years old.",
    "x": 5,
    "y": 7,
    "file": "carter"
  },
  { 
    "born": new Date("2011-01-04"),
    "name": "Makenna Senglaub",
    "age": 4,
    "gender": "f",
    "description":
    "Not yet enrolled in school. Enjoys babies, both living and plastic. Spends time playing, eating, and sleeping.",
    "x": 7,
    "y": 7,
    "file": "makenna"
  },
  { 
    "born": new Date("2015-04-14"),
    "name": "Emmy Lyons",
    "age": 0,
    "gender": "f",
    "description":
    "Is an actual infant child. I don't know if you can tell, but I'm kinda rushing here so sorry about the lack of good information.",
    "x": 14,
    "y": 7,
    "file": "emmy"
  },
  { 
    "born": new Date("1955-05-07"),
    "name": "Jim Sandhoefner",
    "age": 60,
    "gender": "m",
    "description":
    "Some community college. Hates Democrats. Likes guns. Mechanic and security guard. Works a lot. Doesn't believe in climate change.",
    "x": 12,
    "y": 3,
    "file": "jim"
  },
  { 
    "born": new Date("1955-03-27"),
    "name": "Cathy Sandhoefner",
    "age": 59,
    "gender": "f",
    "description":
    "Hasn't been officially employed in many, many years. Enjoys sewing and quilting. Political ideology: 'why can't everyone just get along?'",
    "x": 14,
    "y": 3,
    "file": "cathy"
  },
  { 
    // year uncertain
    "born": new Date("1931-11-20"),
    "name": "Joe Matthews",
    "age": 80,
    "gender": "m",
    "description":
    "Worked for IBM in his heyday. Has hearing aids. Likes to make jokes & spend money on his grandchildren. Seems to be fond of you.",
    "x": 14,
    "y": 1,
    "file": "joe"
  }
];