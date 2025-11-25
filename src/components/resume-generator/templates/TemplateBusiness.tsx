import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "~/server/db/schema/resumes";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Times-Roman", // Serif for professional feel
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontFamily: "Times-Bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    fontSize: 10,
    color: "#555",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  role: {
    fontFamily: "Times-Bold",
    fontSize: 12,
  },
  company: {
    fontFamily: "Times-Bold",
  },
  date: {
    fontStyle: "italic",
  },
  bullet: {
    marginLeft: 15,
    fontSize: 10,
    marginBottom: 2,
  },
});

export function TemplateBusiness({ data }: { data: ResumeData }) {
  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contact}>
          <Text>{data.personalInfo.contact.email}</Text>
          <Text>{data.personalInfo.contact.phone}</Text>
          <Text>{data.personalInfo.contact.linkedin}</Text>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text>{data.summary}</Text>
      </View>

      {/* Experience (Prioritized for Business) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {data.experience.map((exp, i) => (
          <View key={i} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
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

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, i) => (
          <View key={i} style={{ marginBottom: 5 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontFamily: "Times-Bold" }}>{edu.school}</Text>
              <Text style={styles.date}>{edu.year}</Text>
            </View>
            <Text>{edu.degree}</Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Competencies</Text>
        <Text>{data.skills.join(" • ")}</Text>
      </View>
    </View>
  );
}
