---
name: Cloud Infrastructure in the PKI Public Environment
handle: cloud-infrastructure-in-the-pki-public-environment
date: '2023-03-23'
---

Entering the Public Key Infrastructure (PKI) industry as a Certificate Authority (CA) is complex, expensive, and challenging. From high initial infrastructure investments to the extensive process of gaining the browsers’ trust (Mozilla, Chrome, Safari, etc.), not to mention the competitive market. Can CAs implement the cloud and still be trusted by the browsers? The cloud could bring great benefits such as scalability, resiliency, and reduced costs for CAs. However, it is not as easy as it sounds to completely migrate operations to the cloud.

## Gaining Trust

 Pricing makes it hard for organizations that want to enter the industry. If a CA wants its issuing CAs to be trusted by browsers, it could create a root CA and issue an Intermediate CA (end-entity issuer) to gain trust. However, this could take companies looking to enter the industry up to 5 years. While CAs wait to gain trust from the browsers, they cannot generate income selling certificates. This represents a big financial burden, especially for small companies. 

Another option is cross-signing. This is where a certificate gets signed by an already trusted certificate, creating a chain of trust. The newly signed CA can start issuing certificates due to the inherited trust. While costly, this option allows new organizations to quickly issue certificates. However, many CAs tend to avoid cross-signing other roots because it puts additional responsibilities on their shoulders.

## Exploring new possibilities and their limitations

 The PKI industry is governed by strict standards, and CAs must follow those standards carefully since trust means everything in this context. One of the requirements and the main source for browsers to trust CAs is a WebTrust audit from a Third-Party auditor. During these audits, CAs have their policies, procedures, and controls evaluated to ensure they meet industry standards.

One major pushback from browsers when discussing migrating all operations/assets to the cloud is the physical and logical security aspect. WebTrust audits include testing authorized physical and logical access, and private key protection. For example, storing private keys in the cloud defeats the purpose of having full control over key protection. In this case, physical security and environmental controls would be the cloud provider’s responsibility (AWS, Azure, GCS) instead of the CA.

The Baseline Requirements for the Issuance and Management of Publicly Trusted Certificates (BRs) established by the CA/Browser Forum is a set of requirements that CAs must follow to be compliant. Under Section 5 - “Management, Operational, and Physical Controls,” the BRs cover physical controls expected from CAs. Out of all the requirements, the one that stands out the most is physical access to any CA locations. By definition, a CA location is where companies have CA assets stored. The big question is – How can a CA control physical access from a Cloud provider? The short answer is… they can’t.

Datacenters from the big cloud providers tend to be considerable in size as well as personnel, and CAs have no control over who can access these Datacenters. Another issue is that it’s nearly impossible to know the exact hardware used to store the CAs information. In this case, they wouldn’t know the exact location where their private keys are physically stored.

Similar to the Baseline Requirements, the CA/Browser Forum also publishes the Network and Certificate System Security Requirements (NCSSRs). According to the Networking Security Working Group, the NCSSRs “conduct any and all business related to improving the security of Certification Authorities.” For the purpose of this article, let’s focus mainly of section 4 of this document – Vulnerability Detection and Patch Management. 

This section lists actions that CAs must take for the protection of their CA systems. For example, “Certification Authorities shall Undergo a Penetration Test on the CA’s and each Delegated Third Party’s Certificate Systems on at least an annual basis and after infrastructure or application upgrades or modifications that the CA determines are significant;” Now, assuming that a CA migrates completely to the cloud, then this procedure cannot be performed by the CA. If a penetration test is performed on the cloud providers system, it’d be the cloud provider’s responsibility. Another point to add, penetration test results a highly sensitive and, most of the time, confidential. 

## Final Thoughts

Understanding there are roadblocks, it’s also important to highlight the potential benefits of the cloud. As previously mentioned, the startup and operational costs tend to be quite high for CAs. Current key protection practices include the use of Hardware Security Modules (HSMs). While they protect cryptographic keys' integrity and confidentiality, they tend to be expensive. According to Security Today, a cybersecurity magazine, HSM deployment alone could cost $40,000, excluding maintenance, support, or additional hardware costs.

Although the Cloud is a great possibility for the industry in the future, as of today, public CAs cannot fully migrate to the cloud and be compliant. This topic has been brought up in multiple industry conversations due to potential benefits. However, the lack of environmental and physical controls from the CAs is the main concern from the browsers. It will be interesting to see the direction that browsers could take if a solution for these controls gets introduced. 

## Sources

https://securitytoday.com/articles/2018/12/01/the-next-generation.aspx
https://cabforum.org/wp-content/uploads/CA-Browser-Forum-Network-Security-Guidelines-v1.7.pdf
https://cabforum.org/wp-content/uploads/CA-Browser-Forum-BR-1.8.6.pdf