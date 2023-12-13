export default interface AttackSpecial {
          name: string;
          details?: string;
          number_of_actions: number;
          requirements?: string;
          frequency?: string;
          effect: {
            description: string;
            critical_success?: string;
            success?: string;
            failure?: string;
            critical_failure?: string;
            further_explanation?: {
              condition_1?: string;
              condition_2?: string;
              condition_3?: string;
              condition_4?: string
            }
          }
}