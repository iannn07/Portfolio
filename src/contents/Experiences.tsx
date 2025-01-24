interface ExperiencesProps {
  id: string
  title: string
  company: string
  type: string
  duration: string
  content: React.ReactNode
  range: number[]
}

export const experiences: ExperiencesProps[] = [
  {
    id: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b',
    title: 'Software Engineer',
    company: 'PT Kalbe Farma Tbk',
    type: 'Internship',
    duration: 'Feb 2024 - Present',
    content: (
      <p>
        As a Software Engineer, I am responsible to: Took the main role as a Web
        Developer, especially as a front-end engineer with a scope focus on
        Next.js and Supabase. As a Web Developer, I am responsible for building
        end-to-end features in the front end by maximising its performance,
        scalability, and maintainability.
        <br />
        <br />
        I am also responsible for identifying and resolving business process
        bottlenecks from other divisions using certain tools to help them
        automate their process to be 10x faster (Avoid any Manual Processes)
        <br />
        <br />
        On the other hand, I also helped the team to maximise some of the
        feature functionality by improving its performance to be faster and more
        reliable, also I took focus on its code to be maintainable, readable,
        and scalable. However, the philosophy of &quot;Negative Space
        Programming&quot;, is how I wrote my code strengthened since I am
        working on my Thesis Project as well while working as an intern.
        <br />
        <br />
        Finally, I am also responsible for other projects which taking focus on
        Research and Development as well as Proof of Concept to the users.
      </p>
    ),
    range: [0.1, 0.2],
  },
  {
    id: 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35',
    title: 'Lead',
    company: 'Google Developer Students Club (GDSC) @BINUS Malang',
    type: 'Contract',
    duration: 'Aug 2023 - Jun 2024 (11 Months)',
    content: (
      <div className="flex flex-col gap-2">
        <div>
          <p>In this role, I am responsible to:</p>
          <ul>
            {[
              'Maintain the liaison between GDSC and other organizations or company',
              'Organize each division (core team) to ensure their work execution or KPI',
              'Organize the community (member)',
            ].map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>Team achievements:</p>
          <ul>
            {[
              'Increased the member quantity 25x (~2500%) from the previous year',
              'Hosted 5 Local Events and 3 International Events',
              'Collaborated with other GDSC regions',
            ].map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
    range: [0.125, 0.225],
  },
  {
    id: '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
    title: 'Data Management Assistant',
    company: 'BINUS University',
    type: 'Part-time',
    duration: 'Sep 2021 - Feb 2024 (2 Years 6 Months)',
    content: (
      <ul>
        {[
          'Analysing the data for market research purposes',
          'Salesforce (CRM) staff assistant',
          'Data handling & analysis using Ms. Excel & Salesforce',
          'Generate simple business dashboard for further analysis using Excel or Salesforce',
        ].map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    ),
    range: [0.15, 0.25],
  },
  {
    id: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    title: 'Promotion Team',
    company: 'BINUS University',
    type: 'Part-time',
    duration: 'Jul 2021 - Feb 2024 (2 Years 8 Months)',
    content: (
      <ul>
        {[
          'Follow Up with prospective client',
          'MC on several events such as workshops, extracurriculars, etc.',
          'Campus Presentation to Senior High School Student',
          'Outreach to certain cities in Indonesia ',
          'Committee on several marketing events',
        ].map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    ),
    range: [0.175, 0.275],
  },
  {
    id: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    title: 'DUTA BINUSIAN (Mentor)',
    company: 'BINUS University',
    type: 'Contract',
    duration: 'Sep 2022 - Jul 2023 (10 Months)',
    content: (
      <div>
        <p>
          DUTA BINUSIAN (DUBIN) is a scholarship program by BINUS University.
          This program allows us to be a mentor for other students who have low
          academic grades by supporting them and tutoring them through their
          difficulties. Other than that, this program requires every DUBIN to
          tutor their juniors in certain courses before their midterm and final
          exams.
          <br />
          <br />
          The following are several courses that I&apos;ve tutored:
        </p>
        <ul>
          {[
            'Scientific Computing',
            'Program Design Method',
            'Linear Algebra',
            'Computational Biology',
          ].map((item, index) => (
            <li key={index}>• {item}</li>
          ))}
        </ul>
      </div>
    ),
    range: [0.2, 0.3],
  },
]
