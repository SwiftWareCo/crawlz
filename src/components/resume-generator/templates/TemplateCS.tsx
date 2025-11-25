import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "~/server/db/schema/resumes";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Courier", // Monospaced for technical feel
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    color: "#444",
  },
  contact: {
    flexDirection: "row",
    gap: 10,
    fontSize: 9,
    color: "#666",
    flexWrap: "wrap",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 8,
    paddingBottom: 2,
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillItem: {
    backgroundColor: "#eee",
    padding: "2 6",
    borderRadius: 2,
    fontSize: 9,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  projectName: {
    fontWeight: "bold",
  },
  projectTech: {
    fontStyle: "italic",
    fontSize: 9,
    color: "#555",
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  role: {
    fontWeight: "bold",
  },
  company: {
    fontStyle: "italic",
  },
  date: {
    fontSize: 9,
    color: "#666",
  },
  bullet: {
    marginLeft: 10,
    fontSize: 9,
  },
});

export function TemplateCS({ data }: { data: ResumeData }) {
  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contact}>
          <Text>{data.personalInfo.contact.email}</Text>
          <Text>|</Text>
          <Text>{data.personalInfo.contact.phone}</Text>
          <Text>|</Text>
          <Text>{data.personalInfo.contact.linkedin}</Text>
          <Text>|</Text>
          <Text>{data.personalInfo.contact.github}</Text>
          <Text>|</Text>
          <Text>{data.personalInfo.contact.portfolio}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text>{data.summary}</Text>
      </View>

      {/* Skills (Prioritized for CS) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillList}>
          {data.skills.map((skill, i) => (
            <Text key={i} style={styles.skillItem}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Projects</Text>
        {data.projects.map((project, i) => (
          <View key={i} style={styles.projectItem}>
            <View style={styles.projectHeader}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectTech}>{project.techStack}</Text>
            </View>
            <Text>{project.description}</Text>
          </View>
        ))}
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {data.experience.map((exp, i) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <View>
                <Text style={styles.role}>{exp.role}</Text>
                <Text style={styles.company}>{exp.company}</Text>
              </View>
              <Text style={styles.date}>{exp.date}</Text>
            </View>
            {exp.bullets.map((bullet, j) => (
              <Text key={j} style={styles.bullet}>
                • {bullet}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, i) => (
          <View
            key={i}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={{ fontWeight: "bold" }}>{edu.school}</Text>
              <Text>{edu.degree}</Text>
            </View>
            <Text style={styles.date}>{edu.year}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
