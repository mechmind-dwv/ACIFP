# Contributing to ACIFP

Thank you for your interest in contributing to ACIFP (Artefacto Web de Correlación de Interacciones Farmacológicas y Patologías)!

ACIFP is a clinical decision support system designed to help healthcare professionals identify and prevent dangerous drug interactions. Your contributions can help save lives and improve patient safety worldwide.

## 🏥 About ACIFP

ACIFP is a Next.js 15 application with TypeScript that provides:
- Real-time drug interaction analysis
- Clinical severity classification (ALTA_MAYOR, MODERADA, BAJA_MENOR)
- Evidence-based prescription recommendations
- Pathology-based risk personalization
- Professional clinical interface

## 🤝 How to Contribute

### Reporting Issues

We use GitHub Issues to track public bugs and feature requests. Please:

1. **Search existing issues** before creating a new one
2. **Use clear, descriptive titles** 
3. **Provide detailed information** including:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots if applicable

### Clinical Data Contributions

For drug interaction data or clinical evidence:

1. **Provide scientific references** (peer-reviewed journals, clinical guidelines)
2. **Include severity classification** with rationale
3. **Document evidence level** (clinical trial, cohort study, case report)
4. **Specify patient populations** where applicable

### Code Contributions

#### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/mechmind-dwv/ACIFP.git
cd ACIFP

# Install dependencies
npm install

# Set up environment
echo "DATABASE_URL=\"file:./db/custom.db\"" > .env

# Generate Prisma client
npx prisma generate

# Set up database
npx prisma db push
npx tsx migrate-clinical-severity.ts

# Start development server
npm run dev
```

#### Development Workflow

1. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Make your changes** following our coding standards

3. **Test thoroughly**:
   ```bash
   npm run lint
   npm run type-check
   npm test
   ```

4. **Commit your changes**:
   ```bash
   git commit -m "feat: agregar nueva funcionalidad clínica"
   ```

5. **Push and create Pull Request**:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

## 📝 Coding Standards

### TypeScript & JavaScript

- Use **TypeScript strict mode**
- Follow **ESLint** configuration
- Use **descriptive variable and function names**
- Add **JSDoc comments** for complex functions

### React Components

```typescript
// Example component structure
interface MedicamentoCardProps {
  medicamento: Medicamento;
  onSeleccionar: (id: string) => void;
  seleccionado?: boolean;
}

export const MedicamentoCard: React.FC<MedicamentoCardProps> = ({
  medicamento,
  onSeleccionar,
  seleccionado = false
}) => {
  // Component logic
  return (
    <Card className={seleccionado ? 'border-blue-500' : ''}>
      {/* Component JSX */}
    </Card>
  );
};
```

## 🧪 Testing

### Unit Tests

```typescript
// Example test
describe('Análisis de Interacciones', () => {
  it('debe detectar Triple Whammy', async () => {
    const medicamentos = ['lisinopril', 'ibuprofeno', 'furosemida'];
    const resultado = await analizarInteracciones(medicamentos);
    
    expect(resultado.interacciones).toContainEqual(
      expect.objectContaining({
        gravedad: 'ALTA_MAYOR',
        consecuenciaPotencial: expect.stringContaining('Insuficiencia Renal')
      })
    );
  });
});
```

### Clinical Validation

- **Verify clinical accuracy** of all interactions
- **Cross-reference with medical literature**
- **Test edge cases** and multiple medications
- **Validate severity classifications**

## 📚 Documentation

### Clinical Documentation

When adding clinical features:

1. **Update GUIA-USUARIO.md** with new functionality
2. **Add clinical examples** to documentation
3. **Include evidence references**
4. **Provide usage scenarios**

### Technical Documentation

1. **Update API documentation** for new endpoints
2. **Add code comments** for complex logic
3. **Update GUIA-PROGRAMADORES.md** with architectural changes
4. **Document database schema changes**

## 🔍 Review Process

### Pull Request Requirements

All PRs must include:

1. **Clear description** of changes
2. **Related issues** referenced
3. **Tests added/updated**
4. **Documentation updated**
5. **Clinical validation** (if applicable)

### Review Criteria

- **Clinical accuracy** and safety
- **Code quality** and standards
- **Performance** implications
- **User experience** impact
- **Documentation** completeness

## 🌍 Internationalization

ACIFP supports multiple languages:

- **Primary**: Spanish (clinical terminology)
- **Secondary**: English (documentation)
- **Future**: Portuguese, French

When contributing text:
- Use **Spanish** for clinical content
- Use **English** for technical documentation
- Follow **medical terminology standards**

## 📞 Getting Help

### For Clinical Questions

- **Email**: clinical@acifp.org
- **Discord**: #clinical-discussions
- **Schedule**: Office hours with clinical team

### For Technical Questions

- **Email**: dev@acifp.org
- **GitHub Discussions**: Technical support
- **Documentation**: GUIA-PROGRAMADORES.md

## 🏆 Recognition

Contributors are recognized through:

- **GitHub Contributors** list
- **Release notes** acknowledgments
- **Annual report** of contributions
- **Clinical impact** statistics

## 📋 Release Process

1. **Version bump** following semantic versioning
2. **Changelog updated** with all changes
- **Clinical validation** completed
- **Security review** performed
- **Documentation** updated
- **Release published** with detailed notes

## 🔒 Security

For security vulnerabilities:

1. **Do NOT open public issues**
2. **Email**: security@acifp.org
3. **Include detailed information**
4. **We'll respond within 48 hours**

## 📄 License

By contributing, you agree that your contributions will be licensed under MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Thank You

Your contributions help make ACIFP better and save lives. Every contribution, whether clinical data, code, documentation, or feedback, makes a difference in patient safety.

**Together, we're building a safer future for patients worldwide.**

---

*Need help? Check our [GUIA-USUARIO.md](GUIA-USUARIO.md) or [GUIA-PROGRAMADORES.md](GUIA-PROGRAMADORES.md)*