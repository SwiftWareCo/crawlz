import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "~/server/db/schema/resumes";

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontFamily: "Helvetica", // Sans-serif for academic/clean feel
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#2c3e50",
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    color: "#7f8c8d",
    marginBottom: 5,
  },
  contact: {
    fontSize: 9,
    color: "#34495e",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#2980b9",
    borderBottomWidth: 1,
    borderBottomColor: "#bdc3c7",
    marginBottom: 8,
    paddingBottom: 2,
  },
  educationItem: {
    marginBottom: 8,
  },
  school: {
    fontFamily: "Helvetica-Bold",
  },
  degree: {
    fontSize: 10,
  },
  date: {
    fontSize: 9,
    color: "#7f8c8d",
    position: "absolute",
    right: 0,
    top: 0,
  },
  experienceItem: {
    marginBottom: 10,
  },
  role: {
    fontFamily: "Helvetica-Bold",
  },
  company: {
    color: "#2c3e50",
  },
  bullet: {
    marginLeft: 10,
    fontSize: 9,
    color: "#34495e",
  },
});

export function TemplateScience({ data }: { data: ResumeData }) {
  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contact}>
          <Text>
            {data.personalInfo.contact.email} |{" "}
            {data.personalInfo.contact.phone}
          </Text>
          <Text>
            {data.personalInfo.contact.linkedin} |{" "}
            {data.personalInfo.contact.portfolio}
          </Text>
        </View>
      </View>

      {/* Education (Prioritized for Science/Academic) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={styles.educationItem}>
            <Text style={styles.school}>{edu.school}</Text>
            <Text style={styles.date}>{edu.year}</Text>
            <Text style={styles.degree}>{edu.degree}</Text>
          </View>
        ))}
      </View>

      {/* Research/Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Research & Experience</Text>
        {data.experience.map((exp, i) => (
          <View key={i} style={styles.experienceItem}>
            <View>
              <Text style={styles.role}>{exp.role}</Text>
              <Text style={styles.date}>{exp.date}</Text>
            </View>
            <Text style={styles.company}>{exp.company}</Text>
            {exp.bullets.map((bullet, j) => (
              <Text key={j} style={styles.bullet}>
                • {bullet}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Publications/Projects (Mapped from Projects for now) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Publications & Projects</Text>
        {data.projects.map((project, i) => (
          <View key={i} style={{ marginBottom: 8 }}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{project.name}</Text>
            <Text>{project.description}</Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <Text>{data.skills.join(", ")}</Text>
      </View>
    </View>
  );
}
